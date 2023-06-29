import React from 'react';
import Metadata from '../components/metadata';
import { useTranslation } from 'react-i18next';
import Transition from '../components/transitions';

const Index = () => {
  const { t } = useTranslation()

  return (
    <Transition>
      <Metadata title={t('header.home')}/>
      <h1>{t('header.home')}</h1>
      <h2>{t('index.content')}</h2>
    </Transition>
  );
};

export default Index;
