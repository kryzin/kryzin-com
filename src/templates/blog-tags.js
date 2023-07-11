import { Link, graphql } from 'gatsby';
import React from 'react';

import * as blogStyles from '../styles/blog.module.scss';
import '../styles/style.scss';
import moment from 'moment';
import Metadata from "../components/metadata";
import Transition from '../components/transitions';
import { GatsbyImage } from 'gatsby-plugin-image';


const BlogTags = (props) => {
    const labels = props.data.datoCmsPostPage
    const items = props.data.allDatoCmsPost.edges
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
                <Link to='/blog/' className={blogStyles.previous}>
                    {labels.back}
                </Link>
            </div>
            <h1 className={blogStyles.title}>{labels.tag}: {tag}</h1>
            <ul className={blogStyles.posts}>
                {posts && posts.map((edge) => {
                return (
                    <li className={blogStyles.post} key={edge.node.id}>
                    <h2>
                        <Link to={`/blog/${edge.node.slug}/`}>
                        {edge.node.title}
                        </Link>
                    </h2>
                    <div className={blogStyles.meta}>
                        <span>
                        {labels.posted} {FormatDate(edge.node.date)}{' '}
                        <span> / </span> {edge.node.readingTime} {labels.readingTime}
                        </span>
                    </div>
                    {edge.node.featured && (
                        <GatsbyImage
                            className={blogStyles.featured}
                            image={edge.node.featured.gatsbyImageData}
                            alt={edge.node.featuredLabel}
                        />
                    )}
                    <p className={blogStyles.excerpt}>
                        {edge.node.excerpt}
                    </p>
                    <div className={blogStyles.button}>
                        <Link to={`/blog/${edge.node.slug}/`}>
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
    allDatoCmsPost(
      sort: { date: DESC }
      filter: { tags: {elemMatch: {name: {eq: $tag}}}}
        ) {
      edges {
        node {
            id
            excerpt
            slug
            tags {
                name
            }
            date
            title
            featuredLabel
            featured {
                gatsbyImageData(width: 750)
            }
            readingTime
        }
      }
    }
    datoCmsPostPage(locale: $locale) { 
        readMore
        posted
        readingTime
        tag
        back
        blogTitle
        description
    }
  }
`

export default BlogTags;

