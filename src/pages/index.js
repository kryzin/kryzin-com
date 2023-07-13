import * as styles from '../styles/pages.module.scss';
import React from 'react';
import Metadata from '../components/metadata';
import { useTranslation } from 'react-i18next';
import Transition from '../components/transitions';
import { Link } from 'gatsby';

const Index = (pageContext) => {
  const { t } = useTranslation()
  const props = typeof window !== 'undefined' ? (
    localStorage.getItem('current-language') ? localStorage.getItem('current-language') : 'en'
    ) : 'en';

  return (
    <Transition>
      <Metadata title={t('header.home')}/>
      <h1 className={styles.content}>Navigate to preferred language:</h1>
      <ul className={styles.navList}>
        <li><Link to='/en/home' alt="home for en">EN - Home</Link></li>
        <li><Link to='/pl/home' alt="strona główna w pl">PL - Strona Główna</Link></li>
        <li><Link to='/no/home' alt="startside i no">NO - Startside</Link></li>
      </ul>
    </Transition>
  );
};

export default Index;
