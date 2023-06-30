import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form
        action="/"
        method="get"
        autoComplete="off"
    >
        {/* <div class="input-group rounded"> */}
            <input
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                style={{width:'100%'}}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
            />
        {/* </div> */}
    </form>
    
);

export default SearchBar;