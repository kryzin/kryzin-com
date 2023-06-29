import React, { useEffect, useState, useRef } from 'react';
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
  const { i18n } = useTranslation()
  const [language, SetLanguage] = useState('EN');
  const [image, SetImage] = useState(Moon);
  const preferredTheme = useRef('dark');
  const preferredLanguage = useRef('en');

  useEffect (() => {
    if (!localStorage.getItem('current-theme')){
      if (!localStorage.getItem('preferred-theme')){
        preferredTheme.current = 'dark';
        localStorage.setItem('current-theme', preferredTheme);
      } else {
        preferredTheme.current = localStorage.getItem('preferred-theme');
      localStorage.setItem('current-theme', preferredTheme);
      }
    } else {
      preferredTheme.current = localStorage.getItem('current-theme');
    }
    if (preferredTheme.current === 'dark') {
      SetImage(Sun);
      document.documentElement.classList = 'dark';
    } else {
      SetImage(Moon);
      document.documentElement.classList = '';
    }

    if (!localStorage.getItem('current-language')){
      if (!localStorage.getItem('gatsby-i18next-language')){
        preferredLanguage.current = 'en';
        localStorage.setItem('current-language', preferredLanguage.current);
      } else {
        preferredLanguage.current = localStorage.getItem('gatsby-i18next-language');
        localStorage.setItem('current-language', preferredLanguage.current);
      }
    } else {
      preferredLanguage.current = localStorage.getItem('current-language');
    }
    
    i18n.changeLanguage(preferredLanguage.current)
    SetLanguage(preferredLanguage.current.toUpperCase());
  }, [preferredLanguage, i18n])

  function handleLanguage () {
    if (language === 'PL'){
      localStorage.setItem('current-language', 'en');
      i18n.changeLanguage('en');
      SetLanguage('EN');
    } else {
      localStorage.setItem('current-language', 'pl');
      i18n.changeLanguage('pl');
      SetLanguage('PL');
    }
  }

  function handleMode () {
    if (localStorage.getItem('current-theme') === 'dark'){
      localStorage.setItem('current-theme', 'light');
      SetImage(Moon);
      document.documentElement.classList = '';
    } else {
      localStorage.setItem('current-theme', 'dark');
      SetImage(Sun);
      document.documentElement.classList = 'dark';
    }
  };

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.settings}>
        <button className={headerStyles.mode} onClick={handleMode}>
          <img className={headerStyles.images} src={image} alt="Dark/Light mode"/>
        </button>
      </div>
      <div className={headerStyles.settings}>
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
