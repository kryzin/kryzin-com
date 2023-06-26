import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import * as headerStyles from '../styles/header.module.scss';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

const Header = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );
  
  return (
    <header className={headerStyles.header}>
    <div className={headerStyles.overlay}></div>
      <div className={headerStyles.heroContent}>
        <div className={headerStyles.brand}>
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </div>
        <div className={headerStyles.description}>
          {data.site.siteMetadata.description}
        </div>
      </div>
      <nav className={headerStyles.navContainer}>
        <ul className={headerStyles.navList}>
          <li>
            <AniLink cover direction="up" bg="white" to="/" activeClassName={headerStyles.activeMenuItem}>Home</AniLink>
          </li>
          <li>
            <AniLink cover direction="up" bg="white" to="/blog/" activeClassName={headerStyles.activeMenuItem}>Blog</AniLink>
          </li>
          <li>
            <AniLink cover direction="up" bg="white" to="/contact/" activeClassName={headerStyles.activeMenuItem}>Contact</AniLink>
          </li>
          <li>
            <AniLink cover direction="up" bg="white" to="/about/" activeClassName={headerStyles.activeMenuItem}>About</AniLink>
          </li>
          <li>
            <AniLink cover direction="up" bg="white" to="/repos/" activeClassName={headerStyles.activeMenuItem}>Github</AniLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
