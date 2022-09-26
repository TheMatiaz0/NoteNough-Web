import "./Search.css";
import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ({ handleSearchText }) => {
  return (
    <section role="search" className="search">
      <MdSearch className="search-icons" size="1.2em" />
      <input
        onChange={(event) => handleSearchText(event.target.value)}
        type="text"
        placeholder="Type to search..."
      />
    </section>
  );
};

export default Search;
