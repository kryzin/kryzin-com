import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

import Metadata from "../components/metadata";
import BlogItems from '../components/blogItems';
import Transition from '../components/transitions';

const Blog = ({data}) => {
  const { t } = useTranslation()
  
  return (
    <Transition>
      <Metadata
        title="Blog"
        description={t('blog.description')}
      />
      <BlogItems items={data}/>
    </Transition>
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