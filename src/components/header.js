import * as headerStyles from '../styles/header.module.scss';

import Sun from '../images/sun.png';
import Moon from '../images/moon.png';
import SettingsLight from '../images/settings_light.png';
import SettingsDark from '../images/settings_dark.png';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { motion, useScroll } from 'framer-motion';


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
  const [theme, SetTheme] = useState(Moon);
  const [settings, SetSettings] = useState(SettingsLight);
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
      SetTheme(Sun);
      SetSettings(SettingsDark);
      document.documentElement.classList = 'dark';
    } else {
      SetTheme(Moon);
      SetSettings(SettingsLight);
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
    } else if (language === 'NO') {
      localStorage.setItem('current-language', 'pl');
      i18n.changeLanguage('pl');
      SetLanguage('PL');
    } else {
      localStorage.setItem('current-language', 'no');
      i18n.changeLanguage('no');
      SetLanguage('NO');
    }
  }

  function handleMode () {
    if (localStorage.getItem('current-theme') === 'dark'){
      localStorage.setItem('current-theme', 'light');
      SetTheme(Moon);
      SetSettings(SettingsLight);
      document.documentElement.classList = '';
    } else {
      localStorage.setItem('current-theme', 'dark');
      SetTheme(Sun);
      SetSettings(SettingsDark);
      document.documentElement.classList = 'dark';
    }
  };
  const { scrollY } = useScroll();
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -25 }
  };
  const [hidden, setHidden] = React.useState(false);

  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
      console.log("visible");
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
      console.log("hidden");
    }
  }

  React.useEffect(() => {
    return scrollY.onChange(() => update());
  });

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.content}>
        <div className={headerStyles.title}>
          <Link to="/" className={headerStyles.link}>{data.site.siteMetadata.title}</Link>
        </div>
        <div className={headerStyles.description}>
          {t('site.description')}
        </div>
      </div>
      <div className={headerStyles.settings}>
      <motion.nav
        variants={variants}
        animate={hidden ? "hidden": "visible"}
        transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
      >
      <button className={headerStyles.navBtn} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
       <img className={headerStyles.images} src={settings} alt="Dark/Light mode"/>
      </button>
      </motion.nav>
      <div class="offcanvas offcanvas-top h-auto bg-transparent border-0" data-bs-scroll="true" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel" data-bs-dismiss="offcanvas">
        <div class="offcanvas-body m-0">
            <ul className={headerStyles.navList}>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href='/'><Link to='/' activeClassName={headerStyles.menuItem}>
                  <h3>{t('header.home')}</h3>
                </Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href='/blog'><Link to="/blog/" activeClassName={headerStyles.menuItem}>
                  <h3>{t('blog.title')}</h3>
                </Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href='/contact'><Link to="/contact/" activeClassName={headerStyles.menuItem}>
                  <h3>{t('header.contact')}</h3>
                </Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href='/about'><Link to="/about/" activeClassName={headerStyles.menuItem}>
                  <h3>{t('header.about')}</h3>
                </Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href='/repos'><Link to="/repos/" activeClassName={headerStyles.menuItem}>
                  <h3>Github</h3>
                </Link></a>
              </li>
            </ul>
            <button className={headerStyles.navBtn2} onClick={handleMode}>
                <img className={headerStyles.images} src={theme} alt="Dark/Light mode"/>
              </button>
            <button className={headerStyles.navBtn2} onClick={handleLanguage} >
              {language}
            </button>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
