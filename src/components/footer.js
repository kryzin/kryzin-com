import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import * as footerStyles from '../styles/footer.module.scss';
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

    const { t } = useTranslation()

    return (
        <footer className={footerStyles.siteFooter}>
        <div className={footerStyles.container}>
            <p>
            {t('footer.devby')}{data.site.siteMetadata.author} &copy;{' '}
            {new Date().getFullYear().toString()}{' '}
            </p>
        </div>
        </footer>
    );
};

export default Footer;
