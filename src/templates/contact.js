import React from 'react';
import Metadata from '../components/metadata';
import * as formStyles from '../styles/contactform.module.scss';
import Transition from '../components/transitions';
import { graphql } from 'gatsby';

const Contact = (props) => {
  let { contact } = props.data

  return (
    <Transition>
      <Metadata
        title={contact.title}
        description={contact.description}
      />
      <h1 className={formStyles.meta}>{contact.title}</h1>
        <div className={formStyles.formContainer}>
          <p className={formStyles.title}>{contact.formTitle}</p>
          <form name="contact" method="post" netlify>
            <input type="hidden" name="form-name" value="contact" />
            <p>
              <label>{contact.name} </label>
              <input type="text" name="name" id="name" />
            </p>
            <p>
              <label>{contact.email} </label>
              <input type="email" name="email" id="email"/>
            </p>
            <p>
              <label>{contact.message} </label>
              <textarea name="message" id="message"></textarea>
            </p>
            <p className={formStyles.btnContainer}>
            <button type="submit" className={formStyles.btn}>{contact.submit}</button>
            </p>
          </form>
        </div>
        <div className={formStyles.links}>
          <p className={formStyles.contactLabel}>{contact.content} </p>
          <li><a href="https://twitter.com/rawmaii">Twitter @rawmaii</a></li>
          <li><a href="https://instagram.com/rawmaii">Instagram @rawmaii</a></li>
        </div>
    </Transition>
  );
};

export default Contact;

export const query = graphql`
  query ($locale: String!) {
    contact: datoCmsContactPage(locale: $locale) {
      content
      description
      email
      formTitle
      message
      name
      submit
      title
    }
  }
`;
