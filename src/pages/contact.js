import React from 'react';
import Layout from '../components/layout';
import Metadata from '../components/metadata';

const Contact = () => {
  return (
    <Layout>
      <Metadata
        title="Contact"
        description="Follow me on my socials!"
      />
      <h1>Contact Info</h1>
      <p>You can find me here: </p>
      <li><a href="https://twitter.com/rawmaii">Twitter @rawmaii</a></li>
      <li><a href="https://instagram.com/rawmaii">Instagram @rawmaii</a></li>
    </Layout>
  );
};

export default Contact;
