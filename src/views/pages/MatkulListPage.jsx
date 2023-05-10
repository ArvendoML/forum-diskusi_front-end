import React, { useEffect, useState } from "react";
import MatkulCard from "../components/matkul/MatkulCard";
import "../../styles/pages/userMatkulPage.css";
import { getMatkulList } from "../../scripts/api/matkuls";
import { useSearchParams } from "react-router-dom";
import Paginate from "../components/paginate/Paginate";
import { getUserMatkulList } from "../../scripts/api/users";
import MatkulListPageHeader from "../components/matkul/MatkulListPageHeader";

const MatkulListPage = () => {
  const [matkulList, setMatkulList] = useState([]);
  const [userMatkulIdList, setUserMatkulIdList] = useState([]);
  const [sortValue, setSortValue] = useState("default");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Search
  const searchKeywordParam = searchParams.get("search") || "";
  const [keywords, setKeyword] = useState(searchKeywordParam || "");

  const handleSearchKeywords = (search) => {
    setKeyword(search);
    setSearchParams({ search });
  };

  // Filter matkul list from search params
  const filteredMatkulList = matkulList.filter(
    (matkul) =>
      matkul.matkul_name.toLowerCase().includes(searchKeywordParam.toLowerCase()) ||
      matkul.matkul_code.toLowerCase().includes(searchKeywordParam.toLowerCase())
  );

  const checkMatkulMode = async (matkul_id) => {
    const filterId = userMatkulIdList.filter((id) => id === matkul_id);
    if (filterId.length > 0) {
      return "userMatkul";
    } else {
      return "allMatkul";
    }
  };

  // Sort
  let renderedMatkulList = filteredMatkulList;
  const sortMatkulList = (data) => data.sort((a, b) => a.matkul_name.localeCompare(b.matkul_name));
  if (sortValue === "ascending") {
    renderedMatkulList = sortMatkulList(filteredMatkulList);
  } else if (sortValue === "descending") {
    renderedMatkulList = sortMatkulList(filteredMatkulList).reverse();
  } else if (sortValue === "default") {
    renderedMatkulList = filteredMatkulList;
  }

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const getMatkul = await getMatkulList();
      setMatkulList(getMatkul);

      let matkulId = [];
      await getUserMatkulList().then((data) => {
        data.forEach((matkul) => {
          matkulId.push(matkul.id);
        });
      });
      setUserMatkulIdList(matkulId);
      setIsLoading(false);
    };

    getData();
  }, []);

  const renderMatkulCard = ({ currentItems }) => {
    if (renderedMatkulList.length === 0) {
      return <p className="user-matkul-empty">Mata kuliah tidak ditemukan!</p>;
    }
    return (
      <>
        {currentItems.map((matkul, i) => (
          <MatkulCard
            key={i}
            {...matkul}
            matkul_mode={"allMatkul"}
            checkMatkulMode={checkMatkulMode}
            setMatkulList={setMatkulList}
          />
        ))}
      </>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section id="MatkulListPage">
      <MatkulListPageHeader
        handleSearchKeywords={handleSearchKeywords}
        keywords={keywords}
        setSortValue={setSortValue}
      />
      <div>
        <Paginate
          Items={renderMatkulCard}
          data={renderedMatkulList}
          itemsPerPage={8}
          listClassName={"card-list"}
        />
      </div>
    </section>
  );
};

export default MatkulListPage;
