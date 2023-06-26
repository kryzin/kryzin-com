import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import * as headerStyles from '../styles/header.module.scss';
import { useTranslation } from 'react-i18next';
import LanguageMenu from './langMenu';

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

  const { t } = useTranslation()
  
  return (
    <header className={headerStyles.header}>
    <div className={headerStyles.overlay}><LanguageMenu/></div>
      <div className={headerStyles.heroContent}>
        <div className={headerStyles.brand}>
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </div>
        <div className={headerStyles.description}>
          {t('site.description')}
        </div>
      </div>
      <nav className={headerStyles.navContainer}>
        <ul className={headerStyles.navList}>
          <li>
            <Link to="/" activeClassName={headerStyles.activeMenuItem}>{t('header.home')}</Link>
          </li>
          <li>
            <Link to="/blog/" activeClassName={headerStyles.activeMenuItem}>Blog</Link>
          </li>
          <li>
            <Link to="/contact/" activeClassName={headerStyles.activeMenuItem}>{t('header.contact')}</Link>
          </li>
          <li>
            <Link to="/about/" activeClassName={headerStyles.activeMenuItem}>{t('header.about')}</Link>
          </li>
          <li>
            <Link to="/repos/" activeClassName={headerStyles.activeMenuItem}>Github</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
