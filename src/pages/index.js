import React from 'react';
import Metadata from '../components/metadata';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation()

  return (
    <>
      <Metadata title={t('header.home')}/>
      <h1>{t('header.home')}</h1>
      <h2>{t('index.content')}</h2>
    </>
  );
};

export default Index;
