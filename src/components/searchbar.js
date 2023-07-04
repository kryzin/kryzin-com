import React from "react";
import { useTranslation } from 'react-i18next';


const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const { t } = useTranslation();

    return (
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
                    placeholder={t('site.search')}
                    aria-label="Search"
                    aria-describedby="search-addon"
                />
        </form>
    );
    
};

export default SearchBar;


