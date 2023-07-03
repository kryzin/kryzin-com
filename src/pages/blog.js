import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Metadata from "../components/metadata";
// import Posts from '../components/posts';
import Transition from '../components/transitions';
import BlogItems from '../templates/blog-list';

const Blog = () => {
  const { t } = useTranslation()

  return (
    <Transition>
      <Metadata
        title="Blog"
        description={t('blog.description')}
      />
      {/* <Posts/> */}
      <BlogItems page={3}/>
    </Transition>
  );
};

export default Blog;