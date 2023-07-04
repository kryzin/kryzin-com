import * as footerStyles from '../styles/footer.module.scss';

import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const data = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                author
              }
            }
          }
        `
    );
    const handleClick = () => {
      window[`scrollTo`]({ top: 0, behavior: `smooth` })
    }

    const { t } = useTranslation()

    return (
        <footer className={footerStyles.siteFooter}>
        <div className={footerStyles.container}>
            <p className={footerStyles.left}>
            {t('footer.devby')}{data.site.siteMetadata.author} &copy;{' '}
            {new Date().getFullYear().toString()}{' '}
            </p>
            <p className={footerStyles.right}>
              <Link to='/' className={footerStyles.link}>{t('header.home')}</Link>
              <Link to='/contact' className={footerStyles.link}>{t('header.contact')}</Link>
            </p>
            <p><button className={footerStyles.navBtn} onClick={handleClick}>
              ⬆
            </button></p>
            
        </div>
        </footer>
    );
};

export default Footer;
