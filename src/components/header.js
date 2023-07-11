import * as headerStyles from '../styles/header.module.scss';

import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import NavBar from './navbar';

const Header = (locale) => {
  const { t } = useTranslation()
  const lang =  typeof window !== 'undefined' ? localStorage.getItem('current-language'): locale.locale;
  const { i18n } = useTranslation()
  if (i18n.language !== lang){
    i18n.changeLanguage(lang)
  }

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.content}>
        <div className={headerStyles.title}>
          <Link to="/" className={headerStyles.link}>KRYZIN</Link>
        </div>
        <div className={headerStyles.description}>
          {t('site.description')}
        </div>
      </div>
        <NavBar locale={locale}/>
    </header>
  );
};

export default Header;
