import * as blogStyles from '../styles/blog.module.scss';

import { useStaticQuery, graphql, Link } from "gatsby";
import { useTranslation } from 'react-i18next';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from "react";

const MainPost = (props) => {
    const prefix = props.pageContext
    const { t } = useTranslation()
    const data = useStaticQuery(
        graphql`
          query {
            allMarkdownRemark(
                sort: {frontmatter: {date: DESC}}
                filter: {frontmatter: {slug: {ne: null}}}
                ) {
                edges {
                    node {
                        id
                        excerpt
                        frontmatter {
                            slug
                            tags
                            date(formatString: "DD MMMM")
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
        <ul className={blogStyles.posts} style={{marginTop:'20px'}}>
            <li className={blogStyles.post} key={posts.id}>
                <h2>
                    <p>{t('blog.home')}</p>
                    <Link to={`/${prefix}/blog/${posts.frontmatter.slug}/`} className={blogStyles.postTitle}>
                        {posts.frontmatter.title}
                    </Link>
                </h2>
                <div className={blogStyles.meta}>
                    <span>
                        {t('blog.posted')} {posts.frontmatter.date}{' '}
                        <span> / </span> {posts.timeToRead} min {t('blog.read')}
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
                        <Link to={`/${prefix}/blog/${posts.frontmatter.slug}/`}>
                            {t('blog.more')}
                        </Link>
                    </div>
                </li>
        </ul>
    );

};

export default MainPost;
