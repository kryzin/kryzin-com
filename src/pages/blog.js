import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Metadata from "../components/metadata";
import BlogItems from '../components/blogItems';

const Blog = ({data}) => {
  return (
    <Layout>
      <Metadata
        title="Blog"
        description="For all my super smart articles"
      />
      <BlogItems items={data}/>
    </Layout>
  );
};

export default Blog;

export const query = graphql`
      query {
        allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
          edges {
            node {
              frontmatter {
                title
                category
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