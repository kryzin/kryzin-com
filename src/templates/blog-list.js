import React, { useState, useRef } from 'react';
import { Link, graphql } from 'gatsby';

import { GatsbyImage } from 'gatsby-plugin-image';
import * as blogStyles from '../styles/blog.module.scss';
import '../styles/style.scss';
import PageButtons from '../components/pageButtons';
import SearchBar from '../components/searchbar';
import { useFlexSearch } from 'react-use-flexsearch';
import { useTranslation } from 'react-i18next';


const BlogItems = (props) => {
    const { t } = useTranslation()

    const data = props.data
    const items = data.allMarkdownRemark.edges
    const index = data.localSearchPosts.index
    const store = data.localSearchPosts.store

    const unFlattenResults = results =>
    results.map(post => {
        const { date, slug, category, title, id, featured, excerpt} = post;
        return {node: { id, excerpt, fields : { slug }, frontmatter: { title, date, category, featured } }};
    });

    const { search } = typeof window !== 'undefined' ? window.location : '';
    const query = new URLSearchParams(search).get('s')
    const [searchQuery, setSearchQuery] = useState(query || '');
    const results = useFlexSearch(searchQuery, index, store);
    const posts = searchQuery ? unFlattenResults(results) : items;

    return (
    <div>
        <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />
      <ul className={blogStyles.posts}>
        {posts && posts.map((edge) => {
          return (
            <li className={blogStyles.post} key={edge.node.id}>
              <h2>
                <Link to={`/blog/${edge.node.fields.slug}/`}>
                  {edge.node.frontmatter.title}
                </Link>
              </h2>
              <div className={blogStyles.meta}>
                <span>
                  {t('blogitems.posted')} {edge.node.frontmatter.date}{' '}
                  <span> / </span> {edge.node.timeToRead} {t('blogitems.read')}
                </span>
              </div>
              {edge.node.frontmatter.featured && (
                <GatsbyImage
                    className={blogStyles.featured}
                    image={
                    edge.node.frontmatter.featured.childImageSharp.gatsbyImageData
                    }
                    alt={edge.node.frontmatter.title}
                />
              )}
              <p className={blogStyles.excerpt}>
                {edge.node.excerpt}
              </p>
              <div className={blogStyles.button}>
                <Link to={`/blog/${edge.node.fields.slug}/`}>
                    {t('blogitems.more')}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <PageButtons props={props}/>
    </div>
    );
}


export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    localSearchPosts {
        index
        store
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC }}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
            id
            excerpt
            fields {
                slug
            }
            frontmatter {
                category
                date
                title
                featured {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
            timeToRead
        }
      }
    }
  }
`

const Language = (id) => {
  const lang = 'en'
  if (typeof window !== 'undefined') {
    const lang = localStorage.getItem('current-language');
  }
  const readMore = (lang === 'pl') ? "Czytaj dalej" : 'Read More'
  const posted = (lang === 'pl') ? "Dodano" : 'Posted on'
  const read = (lang === 'pl') ? "min czytania" : 'min read'
  if (id === 0){
    return posted
  }
  if (id === 1){
    return read
  } else {
    return readMore
  }
}

export default BlogItems;

