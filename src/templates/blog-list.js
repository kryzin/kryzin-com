import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';

import * as blogStyles from '../styles/blog.module.scss';
import '../styles/style.scss';
import moment from 'moment';
import PageButtons from '../components/pageButtons';
import SearchBar from '../components/searchbar';
import { useFlexSearch } from 'react-use-flexsearch';
import Metadata from "../components/metadata";
import Transition from '../components/transitions';
import { GatsbyImage } from 'gatsby-plugin-image';

const BlogItems = (props) => {
    const prefix = props.pageContext.locale
    const labels = props.data.datoCmsPostPage

    const data = props.data
    const items = data.allMarkdownRemark.edges
    const index = data.localSearchPosts.index
    const store = data.localSearchPosts.store

    const FormatDate = date => {
        let day, month, year;
        day= moment(date).format("DD");
        month= moment(date).format("MMMM");
        year= moment(date).format("YYYY");
        let currentYear = JSON.stringify(new Date().getFullYear());
        if (currentYear === year){
            return (`${day} ${month}`);}
        else {
            return (`${day} ${month}, ${year}`);
        }
    }

    const unFlattenResults = results =>
    results.map(post => {
        const { date, slug, tags, title, id, featured, excerpt} = post;
        return {node: { id, excerpt, frontmatter: { slug, title, date, tags, featured } }};
    });

    const { search } = `/${prefix}/blog/`;
    const query = new URLSearchParams(search).get('s')
    const [searchQuery, setSearchQuery] = useState(query || '');
    const results = useFlexSearch(searchQuery, index, store);
    const posts = searchQuery ? unFlattenResults(results) : items;

    return (
    <Transition>
    <Metadata
        title={labels.blogTitle}
        description={labels.description}
    />
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
                    <Link to={`/${prefix}/blog/${edge.node.frontmatter.slug}/`} className={blogStyles.postTitle}>
                    {edge.node.frontmatter.title}
                    </Link>
                </h2>
                <div className={blogStyles.meta}>
                    <span>
                    {labels.posted} {FormatDate(edge.node.frontmatter.date)}{' '}
                    <span> / </span> {edge.node.timeToRead} {labels.readMore}
                    </span>
                </div>
                {edge.node.frontmatter.featured && (
                    <GatsbyImage
                        className={blogStyles.featured}
                        image={edge.node.frontmatter.featured.childImageSharp.gatsbyImageData}
                        alt={edge.node.frontmatter.altfeatured}
                    />
                )}
                <p className={blogStyles.excerpt}>
                    {edge.node.excerpt}
                </p>
                <div className={blogStyles.button}>
                    <Link to={`/${prefix}/blog/${edge.node.frontmatter.slug}/`}>
                        {labels.readMore}
                    </Link>
                </div>
                </li>
            );
            })}
        </ul>
        <PageButtons props={props}/>
        </div>
    </Transition>
    );
}


export const blogListQuery = graphql`
  query blogListQuery(
    $skip: Int!
    $limit: Int!
    $locale: String!
    ) {
    localSearchPosts {
        index
        store
    }
    datoCmsPostPage(locale: $locale){
        blogTitle
        description
        readMore
        readingTime
        posted
    }
    allMarkdownRemark(
        sort: { frontmatter: { date: DESC }}
        limit: $limit
        skip: $skip
        filter: {frontmatter: {slug: {ne: null}}}
      ) {
        edges {
          node {
              id
              excerpt
              frontmatter {
                  slug
                  tags
                  date
                  title
                  altfeatured
                  featured {
                      childImageSharp {
                        gatsbyImageData(width: 750)
                      }
                  }
              }
              timeToRead
          }
        }
      }
  }
`

export default BlogItems;

