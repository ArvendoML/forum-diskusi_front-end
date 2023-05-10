import React, { useEffect, useState } from "react";
import "../../styles/pages/adminManager.css";
import SearchBar from "../components/SearchBar";
import { Link, useSearchParams } from "react-router-dom";
import { getMatkulList } from "../../scripts/api/matkuls";
import AdminTablePaginate from "../components/paginate/AdminTablePaginate";
import CreateMatkulModal from "../components/modal/CreateMatkulModal";
import UpdateMatkulModal from "../components/modal/UpdateMatkulModal";
import DeleteMatkulModal from "../components/modal/DeleteMatkulModal";

const AdminManager = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCreate, setShowCreate] = useState(false);
  const [matkulList, setMatkulList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  // Search
  const searchKeywordParam = searchParams.get("search") || "";
  const [keywords, setKeyword] = useState(searchKeywordParam || "");
  const handleSearchKeywords = (search) => {
    setKeyword(search);
    setSearchParams({ search });
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const matkulList = await getMatkulList();
      setMatkulList(matkulList);
      setIsLoading(false);
    };
    getData();
  }, []);

  const filteredMatkulList = matkulList.filter(
    (matkul) =>
      matkul.matkul_name.toLowerCase().includes(searchKeywordParam.toLowerCase()) ||
      matkul.matkul_code.toLowerCase().includes(searchKeywordParam.toLowerCase())
  );

  const renderMatkulList = ({ currentItems, index }) => {
    if (filteredMatkulList.length === 0) {
      return (
        <tr>
          <td colSpan={4}>Mata kuliah tidak ditemukan!</td>
        </tr>
      );
    }
    return (
      <>
        {currentItems.map((matkul, i) => (
          <tr key={i}>
            <td>{index + i + 1}</td>
            <td>
              <Link to={`/forum/${matkul.id}`}>{matkul.matkul_name}</Link>
            </td>
            <td>{matkul.matkul_code}</td>
            <td className="admin-manager_table-action">
              <UpdateMatkulModal
                valueName={matkul.matkul_name}
                valueCode={matkul.matkul_code}
                setMatkulList={setMatkulList}
                matkulId={matkul.id}
              />
              <DeleteMatkulModal setMatkulList={setMatkulList} matkulId={matkul.id} />
            </td>
          </tr>
        ))}
      </>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section id="AdminManagerPage">
      <div className="admin-manager_header">
        <SearchBar handleSearchKeywords={handleSearchKeywords} keywords={keywords} />
        <button onClick={handleShowCreate}>Buat Mata Kuliah</button>
      </div>
      <AdminTablePaginate
        Items={renderMatkulList}
        data={filteredMatkulList}
        itemsPerPage={10}
        listClassName={"admin-manager_matkul-list"}
      />

      {/* Modal */}
      <CreateMatkulModal
        show={showCreate}
        handleClose={handleCloseCreate}
        setMatkulList={setMatkulList}
      />
    </section>
  );
};

export default AdminManager;
