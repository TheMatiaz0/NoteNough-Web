import "./Search.css";
import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ({ handleSearchText }) => {
  return (
    <section role="search" className="search">
      <MdSearch className="search-icons" size="2em" />
      <input
        onChange={(event) => handleSearchText(event.target.value)}
        type="text"
        placeholder="What do you want to find?"
      />
    </section>
  );
};

export default Search;
