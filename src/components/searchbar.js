import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form
        action={`/blog/`}
        method="get"
        autoComplete="off"
    >
            <input
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                style={{width:'100%'}}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
            />
    </form>
    
);

export default SearchBar;