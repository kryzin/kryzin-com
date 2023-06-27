import React from 'react';
import Metadata from '../components/metadata';
import * as formStyles from '../styles/contactform.module.scss';
import { useTranslation } from 'react-i18next';
import Transition from '../components/transitions';

// 5471154894 ig profilepage tag

const Contact = () => {
  const { t } = useTranslation()

  return (
    <Transition>
      <Metadata
        title={t('contact.title')}
        description={t('contact.description')}
      />
      <h1>{t('contact.title')}</h1>
        <div className={formStyles.formContainer}>
          <p className={formStyles.title}>{t('contact.form')}</p>
          <form name="contact" method="post" netlify>
            <input type="hidden" name="form-name" value="contact" />
            <p>
              <label>{t('contact.name')} </label>
              <input type="text" name="name" id="name" />
            </p>
            <p>
              <label>{t('contact.email')} </label>
              <input type="email" name="email" id="email"/>
            </p>
            <p>
              <label>{t('contact.mess')} </label>
              <textarea name="message" id="message"></textarea>
            </p>
            <p className={formStyles.btnContainer}>
            <button type="submit" className={formStyles.btn}>{t('contact.send')}</button>
            </p>
          </form>
        </div>
        <div className={formStyles.links}>
          <p>{t('contact.find')} </p>
          <li><a href="https://twitter.com/rawmaii">Twitter @rawmaii</a></li>
          <li><a href="https://instagram.com/rawmaii">Instagram @rawmaii</a></li>
        </div>
    </Transition>
  );
};

export default Contact;
