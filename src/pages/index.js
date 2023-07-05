import * as styles from '../styles/pages.module.scss';
import React from 'react';
import Metadata from '../components/metadata';
import { useTranslation } from 'react-i18next';
import Transition from '../components/transitions';
import MainPost from '../components/featuredPost';

const Index = () => {
  const { t } = useTranslation()

  return (
    <Transition>
      <Metadata title={t('header.home')}/>
      <h1 className={styles.content}>{t('header.home')}</h1>
      <MainPost/>
    </Transition>
  );
};

export default Index;
