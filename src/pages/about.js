import React from 'react';
import Metadata from '../components/metadata';
import { graphql, useStaticQuery } from 'gatsby';
import { useTranslation } from 'react-i18next';
import Transition from '../components/transitions';
import * as aboutStyles from '../styles/about.module.scss';
import { Container } from '../components/instaContainer';

const About = () => {
  const data = useStaticQuery(
    graphql`query MyQuery {
      allInstaNode {
        edges {
          node {
            id
            likes
            comments
            timestamp
            caption
            localFile {
              childImageSharp {
                fluid(quality: 10, maxWidth: 10, maxHeight: 10) {
                  originalImg
                }
              }
            }
          }
        }
      }
    }`
  )
  const { t } = useTranslation()

  return (
    <Transition>
      <Metadata
        title={t('about.title')}
        description={t('about.description')}
      />
      <h1>{t('about.title')}</h1>
      <p className={aboutStyles.content}>{t('about.content')}</p>
      <Container
        title="test"
        text="text"
        nodes={data.allInstaNode}
      />
    </Transition>
  );
};

export default About;