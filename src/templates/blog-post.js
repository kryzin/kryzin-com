import React from 'react';
import { graphql } from 'gatsby';
import * as postStyles from '../styles/blogPost.module.scss';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Comments from '../components/comments';
import { FacebookShareButton, FacebookIcon } from 'react-share'; 
import { LinkedinShareButton, LinkedinIcon } from 'react-share';
import { TwitterShareButton, TwitterIcon } from 'react-share';  

const url = typeof window !== 'undefined' ? window.location.href : '';

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        featured {
          childImageSharp {
            gatsbyImageData(width:750)
          }
        }
      }
      timeToRead
      html
    }
  }
`;

const BlogPost = (props) => {
  const posting = props.data.markdownRemark.frontmatter
  let image = getImage(posting.featured?.childImageSharp?.gatsbyImageData)

  return (
    <>
      <div className={postStyles.content}>
        <h1>{posting.title}</h1>
        <span className={postStyles.meta}>
          Posted on {posting.date}{' '}
          <span> / </span> {props.data.markdownRemark.timeToRead} min
          read
          <span>
            <FacebookShareButton
              url={url}
              quote={'Dummy text!'}
            >
              <FacebookIcon size={16} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={url}
              quote={'Dummy text!'}
            >
              <TwitterIcon size={16} round />
            </TwitterShareButton>
            <LinkedinShareButton
              url={url}
              quote={'Dummy text!'}
            >
              <LinkedinIcon size={16} round />
            </LinkedinShareButton>
          </span>
        </span>
        {
          posting.featured && (
            <GatsbyImage
              className={postStyles.featured}
              image={image}
              alt={posting.title}
            />
          )
        }
        <div
          dangerouslySetInnerHTML={{
            __html: props.data.markdownRemark.html,
          }}
        ></div>
      </div>
      <Comments/>
    </>
  );
};

export default BlogPost;
