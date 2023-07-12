import React from 'react';
import Metadata from '../components/metadata';
import Transition from '../components/transitions';
import * as aboutStyles from '../styles/about.module.scss';
import { graphql } from 'gatsby';

const About = (props) => {
  let { about } = props.data

  return (
    <Transition>
      <Metadata
        title={about.title}
        description={about.description}
      />
      <h1 className={aboutStyles.content}>{about.title}</h1>
      <h3 className={aboutStyles.content}>{about.content}</h3>
    </Transition>
  );
};

export default About;

export const about = graphql`
query($locale: String!) {
  about: datoCmsAboutPage(locale: $locale) {
    title
    description
    content
  }
}
`;