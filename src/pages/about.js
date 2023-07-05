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
      <h1 className={aboutStyles.content}>{t('about.title')}</h1>
      <h3 className={aboutStyles.content}>{t('about.content')}</h3>
    </Transition>
  );
};

export default About;