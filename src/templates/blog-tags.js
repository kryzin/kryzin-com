import { Link, graphql } from 'gatsby';
import React from 'react';

import * as blogStyles from '../styles/blog.module.scss';
import '../styles/style.scss';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Metadata from "../components/metadata";
import Transition from '../components/transitions';
import Img from 'gatsby-image';


const BlogTags = (props) => {
    const { t } = useTranslation()
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
            title={t('blog.title')}
            description={t('blog.description')}
        />
            <div>
            <div>
                <Link to='/blog/' className={blogStyles.previous}>
                    {t('blogitems.back')}
                </Link>
            </div>
            <h1 className={blogStyles.title}>{t('blogitems.tag')}: {tag}</h1>
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
            </div>
        </Transition>
    );
}

export const blogListQuery = graphql`
  query blogListQuery($tag: String) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC }}
      filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
      totalCount
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

export default BlogTags;

