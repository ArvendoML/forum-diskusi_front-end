import React, { useEffect, useState } from "react";
import MatkulCard from "../components/matkul/MatkulCard";
import "../../styles/pages/userMatkulPage.css";
import { getUserMatkulList } from "../../scripts/api/users";
import { useSearchParams } from "react-router-dom";
import Paginate from "../components/paginate/Paginate";
import MatkulListPageHeader from "../components/matkul/MatkulListPageHeader";

const UserMatkulPage = () => {
  const [userMatkulList, setUserMatkulList] = useState([]);
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
  const filteredUserMatkulList = userMatkulList.filter(
    (matkul) =>
      matkul.matkul_name.toLowerCase().includes(searchKeywordParam.toLowerCase()) ||
      matkul.matkul_code.toLowerCase().includes(searchKeywordParam.toLowerCase())
  );

  // Sort
  let renderedUserMatkulList = filteredUserMatkulList;

  const sortMatkulList = (data) => data.sort((a, b) => a.matkul_name.localeCompare(b.matkul_name));
  if (sortValue === "ascending") {
    renderedUserMatkulList = sortMatkulList(filteredUserMatkulList);
  } else if (sortValue === "descending") {
    renderedUserMatkulList = sortMatkulList(filteredUserMatkulList).reverse();
  } else if (sortValue === "default") {
    renderedUserMatkulList = filteredUserMatkulList;
  }

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const userMatkulList = await getUserMatkulList();
      setUserMatkulList(userMatkulList);
      setIsLoading(false);
    };
    getData();
  }, []);

  const renderUserMatkulCard = ({ currentItems }) => {
    if (renderedUserMatkulList.length === 0) {
      return <p className="user-matkul-empty">Mata kuliah tidak ditemukan!</p>;
    }
    return (
      <>
        {currentItems.map((matkul, i) => (
          <MatkulCard
            key={i}
            {...matkul}
            matkul_mode={"userMatkul"}
            setUserMatkulList={setUserMatkulList}
          />
        ))}
      </>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section id="userMatkulPage">
      <MatkulListPageHeader
        handleSearchKeywords={handleSearchKeywords}
        keywords={keywords}
        setSortValue={setSortValue}
      />
      {renderedUserMatkulList.length > 0 ? (
        <div>
          <Paginate
            Items={renderUserMatkulCard}
            data={renderedUserMatkulList}
            itemsPerPage={8}
            listClassName={"card-list"}
          />
        </div>
      ) : (
        <p className="user-matkul-empty">Daftar Mata Kuliah Pengguna Kosong!</p>
      )}
    </section>
  );
};

export default UserMatkulPage;
