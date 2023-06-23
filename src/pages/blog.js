import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import * as blogStyles from './blog.module.scss';

import Img from 'gatsby-image';
import Layout from '../components/layout';
import Metadata from "../components/metadata"

const Blog = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
          edges {
            node {
              frontmatter {
                title
                date(formatString: "DD MMMM, YYYY")
                featured {
                  childImageSharp {
                    fluid(maxWidth: 750) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              timeToRead            
              excerpt
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );
  return (
    <Layout>
      <Metadata
        title="Blog"
        description="For all my super smart articles"
      />
      <ul className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map((edge) => {
          return (
            <li key={edge.node.id} className={blogStyles.post}>
              <h2>
                <Link to={`/blog/${edge.node.fields.slug}/`}>
                  {edge.node.frontmatter.title}
                </Link>
              </h2>
              <div className={blogStyles.meta}>
                <span>
                  Posted on {edge.node.frontmatter.date}{' '}
                  <span> / </span> {edge.node.timeToRead} min read
                </span>
              </div>
              {
                edge.node.frontmatter.featured && (
                  <Img
                    className={blogStyles.featured}
                    fluid={edge.node.frontmatter.featured.childImageSharp.fluid}
                    alt={edge.node.frontmatter.title}
                  />
                )
              }
              <p className={blogStyles.excerpt}>{edge.node.excerpt}</p>
              <div className={blogStyles.button}>
                <Link to={`/blog/${edge.node.fields.slug}/`}>
                  Read More
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Blog;
