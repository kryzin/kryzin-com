import * as styles from '../styles/about.module.scss';

import React from 'react';
import { Link } from 'gatsby';

const NotFound = () => {

  return (
    <>
      <h1 className={styles.content}>404: Page Not Found</h1>
      <p>
        <Link to="/blog/">Check my latest blog posts</Link>
      </p>
    </>
  );
};

export default NotFound;