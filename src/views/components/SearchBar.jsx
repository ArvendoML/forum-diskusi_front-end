import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "../../styles/components/searchBar.css";

const SearchBar = ({ handleSearchKeywords, keywords }) => {
  const handleOnChangeKeywords = (event) => {
    handleSearchKeywords(event.target.value);
  };

  return (
    <section id="searchBar">
      <div className="form-input-with-icon">
        <input
          type="text"
          placeholder="Cari..."
          value={keywords}
          onChange={handleOnChangeKeywords}
        />
        <AiOutlineSearch />
      </div>
    </section>
  );
};

export default SearchBar;
