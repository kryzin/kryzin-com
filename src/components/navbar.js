import * as headerStyles from '../styles/header.module.scss';

import Sun from '../images/sun.png';
import Moon from '../images/moon.png';
import SettingsLight from '../images/settings_light.png';
import SettingsDark from '../images/settings_dark.png';
import DismissLight from '../images/menu_light.png';
import DismissDark from '../images/menu_dark.png';
import React, { useEffect, useState, useRef } from 'react';
import { Link, navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { motion, useScroll } from 'framer-motion';
import { useLocation } from '@reach/router';

const NavBar = (locale) => {
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const [language, SetLanguage] = useState('EN');
  const [theme, SetTheme] = useState(Moon);
  const [dismiss, SetDismiss] = useState(DismissLight);
  const [settings, SetSettings] = useState(SettingsLight);
  const preferredTheme = useRef('dark');
  const preferredLanguage = useRef('en');
  const location = useLocation();
  const prefix = useRef('');
  const pathname = useRef(location.pathname);
  const datoLanguage = locale.locale.locale ? locale.locale.locale : preferredLanguage.current;

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
      SetDismiss(DismissDark);
      document.documentElement.classList = 'dark';
    } else {
      SetTheme(Moon);
      SetSettings(SettingsLight);
      SetDismiss(DismissLight);
      document.documentElement.classList = '';
    }
    preferredLanguage.current = datoLanguage
    localStorage.setItem('current-language', preferredLanguage.current)
    i18n.changeLanguage(preferredLanguage.current)
    prefix.current = preferredLanguage.current === 'en' ? "" : preferredLanguage.current
    SetLanguage(preferredLanguage.current.toUpperCase());
  }, [preferredLanguage, datoLanguage, i18n])

  // useEffect(() => {
    // setPathname(location.pathname)
    // if (pathname.startsWith('/pl/') || pathname.startsWith('/no/')) {
    //   setPathname(location.pathname.substring(3))
    // } else {
    //   setPathname(location.pathname.substring(1))
    // }
  // }, [location, pathname]);
  
  function handleLanguage () {
    console.log("handle  " + pathname.current)
    if (pathname.current.startsWith('/pl/') || pathname.current.startsWith('/no/')) {
      pathname.current = pathname.current.substring(3)
    }
    if (language === 'PL'){
      prefix.current = ""
      navigate(pathname.current)
    } else if (language === 'NO') {
      prefix.current = 'pl'
      if (pathname.current === '') {
        navigate(pathname.current)
      } else {
        navigate('/pl' + pathname.current)
      }
    } else {
      prefix.current = 'no'
      if (pathname.current === '') {
        navigate(pathname.current)
      } else {
        navigate('/no' + pathname.current)
      }
    }
  }

  function handleMode () {
    if (localStorage.getItem('current-theme') === 'dark'){
      localStorage.setItem('current-theme', 'light');
      SetTheme(Moon);
      SetSettings(SettingsLight);
      SetDismiss(DismissLight);
      document.documentElement.classList = '';
    } else {
      localStorage.setItem('current-theme', 'dark');
      SetTheme(Sun);
      SetSettings(SettingsDark);
      SetDismiss(DismissDark);
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
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }

  React.useEffect(() => {
    return scrollY.onChange(() => update());
  });

  return (
    <div>
        <div className={headerStyles.settings} style={{zIndex:10}}>
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
                <ul className={headerStyles.navList} style={{zIndex:100}}>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href='/'><Link to='/' activeClassName={headerStyles.menuItem}>
                            <h3>{t('header.home')}</h3>
                        </Link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href='/blog'><Link to={`/${prefix.current}/blog`} activeClassName={headerStyles.menuItem}>
                            <h3>{t('header.blog')}</h3>
                        </Link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href='/contact'><Link to={`/${prefix.current}/contact/`} activeClassName={headerStyles.menuItem}>
                            <h3>{t('header.contact')}</h3>
                        </Link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href='/about'><Link to={`/${prefix.current}/about`} activeClassName={headerStyles.menuItem}>
                            <h3>{t('header.about')}</h3>
                        </Link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href='/repos'><Link to={`/${prefix.current}/repos`} activeClassName={headerStyles.menuItem}>
                            <h3>Github</h3>
                        </Link></a>
                    </li>
                </ul>
                <button className={headerStyles.navBtn2} >
                    <img className={headerStyles.images} src={dismiss} alt='Close menu'/>
                </button>
                <button className={headerStyles.navBtn2} onClick={handleMode}>
                    <img className={headerStyles.images} src={theme} alt="Dark/Light mode"/>
                </button>
                <button className={headerStyles.navBtn2} onClick={handleLanguage} >
                    {language}
                </button>
            </div>
        </div>
        </div>
    </div>
  );
};

export default NavBar;
