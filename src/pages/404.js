import React from 'react';
import { Link } from 'gatsby';

const NotFound = () => {
  return (
    <>
      <h1>404: Page Not Found</h1>
      <p>
        <Link to="/blog/">Check my latest articles</Link>
      </p>
    </>
  );
};

export default NotFound;
