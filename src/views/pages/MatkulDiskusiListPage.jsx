import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "../../styles/pages/matkulDiskusiListPage.css";
import DiskusiCard from "../components/discussion/DiskusiCard";
import { getDiscussionList } from "../../scripts/api/discussions";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getOneMatkul } from "../../scripts/api/matkuls";
import DiskusiModal from "../components/modal/DiskusiModal";
import Paginate from "../components/paginate/Paginate";
import { IoIosArrowBack } from "react-icons/io";

const MatkulDiskusiListPage = () => {
  const navigate = useNavigate();
  const { id_matkul } = useParams();
  const [discussionsList, setDiscussionsList] = useState([]);
  const [matkul, setMatkul] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Search
  const searchKeywordParam = searchParams.get("search") || "";
  const [keywords, setKeyword] = useState(searchKeywordParam || "");

  const handleSearchKeywords = (search) => {
    setKeyword(search);
    setSearchParams({ search });
  };

  // Filter matkul list from search params
  const filteredDiscussionsList = discussionsList.filter(
    (discussion) =>
      discussion.discussion_title.toLowerCase().includes(searchKeywordParam.toLowerCase()) ||
      discussion.discussion_description.toLowerCase().includes(searchKeywordParam.toLowerCase())
  );

  const navigateBack = () => {
    const sum = keywords.length + 1;

    navigate(-sum);
  };

  useEffect(() => {
    const getData = async () => {
      const diskusi = await getDiscussionList(id_matkul);
      const matkul = await getOneMatkul(id_matkul);

      setDiscussionsList(diskusi);
      setMatkul(matkul);
    };

    getData();
  }, [id_matkul]);

  // Handle Modal Create Discussion
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const renderDiscussionCard = ({ currentItems }) => {
    return (
      <>
        {currentItems.map((diskusi, i) => (
          <DiskusiCard key={i} {...diskusi} />
        ))}
      </>
    );
  };

  return (
    <section id="matkulDiskusiListPage">
      <div className="diskusi-header">
        <div className="diskusi-header_top">
          <button className="navigate-back">
            <IoIosArrowBack onClick={navigateBack} />
          </button>
          <h1>
            {matkul.matkul_name} - {matkul.matkul_code}
          </h1>
        </div>
        <hr />
        <div className="diskusi-header-group">
          <SearchBar handleSearchKeywords={handleSearchKeywords} keywords={keywords} />
          <button className="btn btn-success btn-create-discussion" onClick={handleShowCreate}>
            Buat Diskusi
          </button>
        </div>
      </div>

      {/* Create Discussion */}
      <DiskusiModal
        show={showCreate}
        handleClose={handleCloseCreate}
        id_matkul={id_matkul}
        setDiscussionsList={setDiscussionsList}
        modal_mode={"createDiscussion"}
      />

      {/* Show Comments List */}
      <div>
        {filteredDiscussionsList.length !== 0 ? (
          <Paginate
            Items={renderDiscussionCard}
            data={filteredDiscussionsList}
            itemsPerPage={8}
            listClassName={"diskusi-list"}
          />
        ) : (
          <p className="diskusi-list">Belum ada diskusi!</p>
        )}
      </div>
    </section>
  );
};

export default MatkulDiskusiListPage;
