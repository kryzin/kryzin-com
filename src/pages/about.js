import React from 'react';
import Metadata from '../components/metadata';
import { useTranslation } from 'react-i18next';
import Transition from '../components/transitions';

const About = () => {
  const { t } = useTranslation()

  return (
    <Transition>
      <Metadata
        title={t('about.title')}
        description={t('about.description')}
      />
      <h1>{t('about.title')}</h1>
      <p>{t('about.content')}</p>
    </Transition>
  );
};

export default About;