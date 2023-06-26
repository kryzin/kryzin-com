import React from 'react';
import Layout from '../components/layout';
import Metadata from '../components/metadata';
import * as formStyles from '../styles/contactform.module.scss';

const Contact = () => {
  return (
    <Layout>
      <Metadata
        title="Contact"
        description="Follow me on my socials!"
      />
      <h1>Contact Me!</h1>
        <div className={formStyles.formContainer}>
          <p className={formStyles.title}>Use this form to get in touch!</p>
          <form name="contact" method="POST" netlify>
            <p>
              <label>Your Name: </label>
            </p>
            <p>
              <input type="text" name="name" />
            </p>
            <p>
              <label>Your Email: </label>
            </p>
            <p>
              <input type="email" name="email" />
            </p>
            <p>
              <label>Message: </label>
            </p>
            <p>
              <textarea name="message"></textarea>
            </p>
            <div className={formStyles.btnContainer}>
            <button type="submit" className={formStyles.btn}>Send</button>
            </div>
          </form>
        </div>
        <div className={formStyles.links}>
          <p>You can find me here: </p>
          <li><a href="https://twitter.com/rawmaii">Twitter @rawmaii</a></li>
          <li><a href="https://instagram.com/rawmaii">Instagram @rawmaii</a></li>
        </div>
    </Layout>
  );
};

export default Contact;
