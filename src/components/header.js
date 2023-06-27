import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import * as headerStyles from '../styles/header.module.scss';
import { useTranslation } from 'react-i18next';
import Sun from '../images/sun.png';
import Moon from '../images/moon.png';

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

  const [toggleTheme, SetToggleTheme] = useState(false);
  const [image, SetImage] = useState(Moon);

  function handleMode () {
    if (toggleTheme) {
      SetImage(Sun);
      document.documentElement.classList = 'dark';
    } else {
      SetImage(Moon);
      document.documentElement.classList = '';
    }
    SetToggleTheme(!toggleTheme);
  } 

  const { i18n } = useTranslation()
  const [toggleLanguage, SetToggletanguage] = useState(true);
  const [language, SetLanguage] = useState('EN');

  function handleLanguage () {
    if (toggleLanguage){
      i18n.changeLanguage('en');
      SetLanguage('EN');
    } else {
      i18n.changeLanguage('pl');
      SetLanguage('PL');
    }
    SetToggletanguage(!toggleLanguage);
  }

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.settings}>
        <button className={headerStyles.mode} onClick={handleMode}>
          <img src={image}/>
        </button>
        <button className={headerStyles.mode} onClick={handleLanguage}>
          {language}
        </button>
      </div>
      <div className={headerStyles.content}>
        <div className={headerStyles.title}>
          <Link to="/" className={headerStyles.link}>{data.site.siteMetadata.title}</Link>
        </div>
        <div className={headerStyles.description}>
          {t('site.description')}
        </div>
      </div>
      <nav className={headerStyles.navContainer}>
        <ul className={headerStyles.navList}>
          <li>
            <Link to="/" activeClassName={headerStyles.menuItem}>
              <h3>{t('header.home')}</h3>
            </Link>
          </li>
          <li>
            <Link to="/blog/" activeClassName={headerStyles.menuItem}>
              <h3>Blog</h3>
            </Link>
          </li>
          <li>
            <Link to="/contact/" activeClassName={headerStyles.menuItem}>
              <h3>{t('header.contact')}</h3>
            </Link>
          </li>
          <li>
            <Link to="/about/" activeClassName={headerStyles.menuItem}>
              <h3>{t('header.about')}</h3>
            </Link>
          </li>
          <li>
            <Link to="/repos/" activeClassName={headerStyles.menuItem}>
              <h3>Github</h3>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
