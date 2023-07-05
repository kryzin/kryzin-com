import React, { useRef } from 'react';
import { Link, graphql } from 'gatsby';
import * as postStyles from '../styles/blogPost.module.scss';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Comments from '../components/comments';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'; 
import Fb from '../images/facebook.png';
import Li from '../images/linkedin.png';
import Tw from '../images/twitter.png';
import { useTranslation } from 'react-i18next';

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
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
      edges {
        node {
          fields {
            slug
          }
        }
        next {
          fields {
            slug
          }
        }
        previous {
          fields {
            slug
          }
        }
      }
    }
  }
`;

const BlogPost = (props) => {
  const { t } = useTranslation()
  const posting = props.data.markdownRemark.frontmatter
  let image = getImage(posting.featured?.childImageSharp?.gatsbyImageData)
  const slug = props.pageContext.slug
  const allPosts = props.data.allMarkdownRemark.edges
  const currentIndex = allPosts.findIndex(post => post.node.fields.slug === slug)
  const next = useRef(null);
  const previous = useRef(null);

  if (currentIndex > 0){
    next.current = JSON.stringify(allPosts[currentIndex - 1].node.fields.slug).replace(`"`,'').replace(`"`,'');
  }
  if (currentIndex < allPosts.length - 1) {
    previous.current = JSON.stringify(allPosts[currentIndex + 1].node.fields.slug).replace(`"`,'').replace(`"`,'');
  }

  return (
    <>
      <div className={postStyles.content}>
        <div className={postStyles.previous}>
          <Link to='/blog/'>
            {t('blogitems.back')}
          </Link>
        </div>
        <h1>{posting.title}</h1>
        <span className={postStyles.meta}>
          {t('blogitems.posted')} {posting.date}{' '}
          <span> / </span> {props.data.markdownRemark.timeToRead} {t('blogitems.read')}
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
      <div>
        <span className={postStyles.shareBtn}>
          <FacebookShareButton
            url={url}
            quote={'Dummy text!'}
          >
            <img src={Fb} height={16} alt="Facebook"/>
          </FacebookShareButton>
          <TwitterShareButton
            url={url}
            quote={'Dummy text!'}
          >
            <img src={Tw} height={16} alt="Twitter"/>
          </TwitterShareButton>
          <LinkedinShareButton
            url={url}
            quote={'Dummy text!'}
          >
            <img src={Li} height={16} alt="Linkedin"/>
          </LinkedinShareButton>
        </span>
      </div>
      <div className={postStyles.navContainer}>
        <div className={postStyles.previous}>
          {previous.current !== null && (
            <Link to={`/blog/${previous.current}`}>
              {t('blog.previous')}
            </Link>
          )}
        </div>
        <div className={postStyles.next}>
          {next.current !== null && (
            <Link to={`/blog/${next.current}`}>
              {t('blog.next')}
            </Link>
          )}
        </div>
      </div>
      <Comments />
    </>
  );
};

export default BlogPost;