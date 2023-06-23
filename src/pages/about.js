import React from 'react';
import Layout from '../components/layout';
import Metadata from '../components/metadata';

const About = () => {
  return (
    <Layout>
      <Metadata
        title="About"
        description="All the info you need about me :)"
      />
      <h1>About Me</h1>
      <p>Karolina is currently doing a Bachelor of Science degree in Computer Science at UWM.</p>
    </Layout>
  );
};

export default About;
