import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';

import * as blogStyles from '../styles/blog.module.scss';
import '../styles/style.scss';
import moment from 'moment';
import PageButtons from '../components/pageButtons';
import SearchBar from '../components/searchbar';
import { useFlexSearch } from 'react-use-flexsearch';
import { useTranslation } from 'react-i18next';
import Metadata from "../components/metadata";
import Transition from '../components/transitions';
import Img from 'gatsby-image';


const BlogItems = (props) => {
    const { t } = useTranslation()

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
        return {node: { id, excerpt, fields : { slug }, frontmatter: { title, date, tags, featured } }};
    });

    const { search } = '/blog/';
    const query = new URLSearchParams(search).get('s')
    const [searchQuery, setSearchQuery] = useState(query || '');
    const results = useFlexSearch(searchQuery, index, store);
    const posts = searchQuery ? unFlattenResults(results) : items;

    return (
    <Transition>
    <Metadata
        title={t('blog.title')}
        description={t('blog.description')}
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
                    <Link to={`/blog/${edge.node.fields.slug}/`}>
                    {edge.node.frontmatter.title}
                    </Link>
                </h2>
                <div className={blogStyles.meta}>
                    <span>
                    {t('blogitems.posted')} {FormatDate(edge.node.frontmatter.date)}{' '}
                    <span> / </span> {edge.node.timeToRead} {t('blogitems.read')}
                    </span>
                </div>
                {edge.node.frontmatter.featured && (
                    <Img
                        className={blogStyles.featured}
                        fluid={edge.node.frontmatter.featured.childImageSharp.fluid}
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
    </Transition>
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
                tags
                date
                title
                featured {
                    childImageSharp {
                        fluid(maxWidth: 750) {
                            ...GatsbyImageSharpFluid
                        }
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

