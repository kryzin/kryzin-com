import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <>
      <h1>{t('error.404')}</h1>
      <p>
        <Link to="/blog/">{t('error.404mess')}</Link>
      </p>
    </>
  );
};

export default NotFound;
