import "./Search.css";
import React from "react";
import { MdSearch } from "react-icons/md";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const Search = ({ handleSearchText, toggleSortOrder, isSortedByNewest }) => {
  const handleSortClick = (event) => {
    event.stopPropagation();
    toggleSortOrder();
  }

  return (
    <section role="search" className="search">
      <MdSearch className="search-icons" size="2em" />
      <input
        onChange={(event) => handleSearchText(event.target.value)}
        type="text"
        placeholder="What do you want to find?"
      />
      <button onClick={handleSortClick} className="sort-button" tabIndex="-1">
        {isSortedByNewest ? <FaSortAmountDown size="2em" /> : <FaSortAmountUp size="2em" />}
      </button>
    </section>
  );
};

export default Search;
