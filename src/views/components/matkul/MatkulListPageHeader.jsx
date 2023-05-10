import React from "react";
import SearchBar from "./../SearchBar";
import { Form } from "react-bootstrap";
import "../../../styles/components/matkulListPageHeader.css";

const MatkulListPageHeader = ({ handleSearchKeywords, keywords, setSortValue }) => {
  const handleOnChangeSort = (event) => {
    const value = event.target.value;
    if (value === "ascending") {
      setSortValue("ascending");
    } else if (value === "descending") {
      setSortValue("descending");
    } else {
      setSortValue("default");
    }
  };

  return (
    <div className="matkul-list-page-header">
      <SearchBar handleSearchKeywords={handleSearchKeywords} keywords={keywords} />
      <div className="matkul-list-page-header_select">
        <Form.Select onChange={handleOnChangeSort}>
          <option value="default">Sort By</option>
          <option value="ascending">A-Z</option>
          <option value="descending">Z-A</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default MatkulListPageHeader;
