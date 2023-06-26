import React from 'react';
import Metadata from '../components/metadata';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation()

  return (
    <>
      <Metadata
        title={t('about.title')}
        description={t('about.description')}
      />
      <h1>{t('about.title')}</h1>
      <p>{t('about.content')}</p>
    </>
  );
};

export default About;