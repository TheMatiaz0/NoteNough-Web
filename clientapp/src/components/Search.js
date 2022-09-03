import React from 'react';
import { MdSearch } from 'react-icons/md';

const Search = ({ handleSearchText }) => {
    return (
        <div className="search">
            <MdSearch className='search-icons' size='1.2em' />
            <input onChange={(event) => handleSearchText(event.target.value)} type="text" placeholder="Type to search..." />
        </div>
    )
};

export default Search;