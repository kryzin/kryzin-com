import * as blogStyles from '../styles/blog.module.scss';

import { useStaticQuery, graphql, Link } from "gatsby";
import { useTranslation } from 'react-i18next';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from "react";

const MainPost = () => {
    const { t } = useTranslation()
    const data = useStaticQuery(
        graphql`
          query {
            allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
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
                            featured {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            }
                            title
                        }
                        timeToRead
                    }
                }
            }
          }
        `
    );
    const posts = data.allMarkdownRemark.edges[0].node
    console.log('POSTS ' + JSON.stringify(posts))

    return (
        <ul className={blogStyles.posts}>
            <li className={blogStyles.post} key={posts.id}>
                <h2>
                    <p>{t('blogitems.home')}</p>
                    <Link to={`/blog/${posts.fields.slug}/`}>
                        {posts.frontmatter.title}
                    </Link>
                </h2>
                <div className={blogStyles.meta}>
                    <span>
                        {t('blogitems.posted')} {posts.frontmatter.date}{' '}
                        <span> / </span> {posts.timeToRead} {t('blogitems.read')}
                    </span>
                </div>
                    {posts.frontmatter.featured && (
                        <GatsbyImage
                          className={blogStyles.featured}
                          image={
                            posts.frontmatter.featured.childImageSharp.gatsbyImageData
                          }
                          alt={posts.frontmatter.title}
                        />
                    )}
                    <p className={blogStyles.excerpt}>
                        {posts.excerpt}
                    </p>
                    <div className={blogStyles.button}>
                        <Link to={`/blog/${posts.fields.slug}/`}>
                            {t('blogitems.more')}
                        </Link>
                    </div>
                </li>
        </ul>
    );

};

export default MainPost;
