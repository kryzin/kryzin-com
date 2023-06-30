import React from 'react';
import { useTranslation } from 'react-i18next';

import Metadata from "../components/metadata";
import Posts from '../components/posts';
import Transition from '../components/transitions';

const Blog = () => {
  const { t } = useTranslation()
  
  return (
    <Transition>
      <Metadata
        title="Blog"
        description={t('blog.description')}
      />
      <Posts/>
    </Transition>
  );
};

export default Blog;