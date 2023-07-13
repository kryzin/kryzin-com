import { Link, graphql } from 'gatsby';
import React from 'react';

import * as blogStyles from '../styles/blog.module.scss';
import '../styles/style.scss';
import moment from 'moment';
import Metadata from "../components/metadata";
import Transition from '../components/transitions';
import { GatsbyImage } from 'gatsby-plugin-image';


const BlogTags = (props) => {
    const prefix = props.pageContext.locale
    const labels = props.data.datoCmsPostPage

    const items = props.data.allMarkdownRemark.edges
    const { tag } = props.pageContext

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

    const posts = items;

    return (
        <Transition>
        <Metadata
            title={labels.blogTitle}
            description={labels.description}
        />
            <div>
            <div>
                <Link to={`/${prefix}/blog/`} className={blogStyles.previous}>
                    {labels.back}
                </Link>
            </div>
            <h1 className={blogStyles.title}>{labels.tag}: {tag}</h1>
            <ul className={blogStyles.posts}>
                {posts && posts.map((edge) => {
                return (
                    <li className={blogStyles.post} key={edge.node.id}>
                    <h2>
                        <Link to={`/${prefix}/blog/${edge.node.frontmatter.slug}/`}>
                        {edge.node.frontmatter.title}
                        </Link>
                    </h2>
                    <div className={blogStyles.meta}>
                        <span>
                        {labels.posted} {FormatDate(edge.node.frontmatter.date)}{' '}
                        <span> / </span> {edge.node.timeToRead} {labels.readingTime}
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
            </div>
        </Transition>
    );
}

export const blogListQuery = graphql`
  query blogListQuery(
    $tag: String
    $locale: String!
    ) {
    datoCmsPostPage(locale: $locale) { 
        readMore
        posted
        readingTime
        tag
        back
        blogTitle
        description
    }
    allMarkdownRemark(
        sort: { frontmatter: { date: DESC }}
        filter: { frontmatter: { tags: { in: [$tag] }, locale: {eq: $locale} } }
          ) {
        totalCount
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

export default BlogTags;

