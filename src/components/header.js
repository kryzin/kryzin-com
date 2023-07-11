import * as headerStyles from '../styles/header.module.scss';

import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import NavBar from './navbar';

const Header = () => {
  const { t } = useTranslation()

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
        <NavBar/>
    </header>
  );
};

export default Header;
