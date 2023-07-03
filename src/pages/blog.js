import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Metadata from "../components/metadata";
// import Posts from '../components/posts';
import Transition from '../components/transitions';
import BlogItems from '../templates/blog-list';
import SearchBar from '../components/searchbar';
import { useFlexSearch } from 'react-use-flexsearch';

const Blog = () => {
  const { t } = useTranslation()
  const index = this.props.data.localSearchPosts.index
  const store = this.props.data.localSearchPosts.store

  const unFlattenResults = results =>
    results.map(post => {
        const { date, slug, category, title, id, featured, excerpt} = post;
        return {node: { id, excerpt, fields : { slug }, frontmatter: { title, date, category, featured } }};
  });

  const { search } = typeof window !== 'undefined' ? window.location : '';
  const query = new URLSearchParams(search).get('s')
  const [searchQuery, setSearchQuery] = useState(query || '');
  const results = useFlexSearch(searchQuery, index, store);
  const posts = searchQuery ? unFlattenResults(results) : '';

  return (
    <Transition>
      <Metadata
        title="Blog"
        description={t('blog.description')}
      />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <BlogItems/>
    </Transition>
  );
};

export default Blog;