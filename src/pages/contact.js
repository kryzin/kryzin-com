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
        <div className={formStyles.linksColumn}>
          <p>You can find me here: </p>
          <li><a href="https://twitter.com/rawmaii">Twitter @rawmaii</a></li>
          <li><a href="https://instagram.com/rawmaii">Instagram @rawmaii</a></li>
        </div>
        <div className={formStyles.separator}></div>
        <div className={formStyles.formContainer}>
          <p className={formStyles.title}>Use this form to get in touch!</p>
          <form>
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
            <p>
            <button type="submit" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Send</button>
            </p>
          </form>
        </div>
    </Layout>
  );
};

export default Contact;
