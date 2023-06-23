import React from 'react';
import * as searchStyles from './search.module.scss';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form
        action="/blog/"
        method="get"
        autoComplete="off"
    >
        <label htmlFor="header-search">
            <span className={searchStyles.hidden}>
                Search blog posts
            </span>
        </label>
        <input
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;