import React from 'react';
import Metadata from '../components/metadata';
import { useTranslation } from 'react-i18next';
import Transition from '../components/transitions';
import * as aboutStyles from '../styles/about.module.scss';

const About = () => {
  const { t } = useTranslation()

  return (
    <Transition>
      <Metadata
        title={t('about.title')}
        description={t('about.description')}
      />
      <h1>{t('about.title')}</h1>
      <p className={aboutStyles.content}>{t('about.content')}</p>
    </Transition>
  );
};

export default About;