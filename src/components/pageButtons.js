import React from 'react';
import { Link } from 'gatsby';
import * as navStyles from '../styles/blog.module.scss';


const PageButtons = (props) => {
    const prefix = typeof window !== 'undefined' ? localStorage.getItem('current-language') : 'en';
    const currentPage = props.props.pageContext.currentPage
    const numPages = props.props.pageContext.numberOfPages
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prev = currentPage === 2 ? `/${prefix}/blog` : `/${prefix}/blog/${currentPage - 1}`;
    const next = currentPage + 1;
    

    return (
        <div className={navStyles.btnContainer}>
        <div className={navStyles.btn}>
            {!isFirst && (
            <span>
                <Link to={prev} rel="prev">
                <p className={navStyles.btnLabel}>Previous</p>
                </Link>
            </span>
            )}
        </div>
        <div className={navStyles.btnActive}>
            <span>
                <Link to={currentPage === 1 ? `/${prefix}/blog` : `/${prefix}/blog/${currentPage}`}>{currentPage}</Link>
            </span>
        </div>
        <div className={navStyles.btn}>
            {!isLast && (
            <span>
                <Link to={`/${prefix}/blog/${next}`} rel="next">
                <p className={navStyles.btnLabel}>Next</p>
                </Link>
            </span>
            )}
        </div>
        </div>
    );
};

export default PageButtons;