import React, { useRef } from 'react';
import { Link, graphql } from 'gatsby';
import * as postStyles from '../styles/blogPost.module.scss';

import Comments from '../components/comments';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'; 
import Fb from '../images/facebook.png';
import Li from '../images/linkedin.png';
import Tw from '../images/twitter.png';
import { GatsbyImage } from 'gatsby-plugin-image';

const url = typeof window !== 'undefined' ? window.location.href : '';

export const query = graphql`
  query($locale: String!) {
    datoCmsSiteInfo {
      authorIcon {
        gatsbyImageData(width: 200)
      }
    }
    datoCmsPostPage(locale: $locale) {
      back
      follow
      next
      posted
      previous
      readingTime
      tags
    }
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      ) {
      edges {
        node {
          html
          timeToRead
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            slug
            title
            tags
            altfeatured
            featured {
              childImageSharp {
                gatsbyImageData(width: 750)
              }
            }
          }
        }
        next {
          frontmatter {
            slug
          }
        }
        previous {
          frontmatter {
            slug
          }
        }
      }
    }
  }
`;

const BlogPost = (props) => {
  const prefix = props.pageContext.locale
  const labels = props.data.datoCmsPostPage
  const slug = props.pageContext.slug

  const posting = props.data.allMarkdownRemark.edges.find(
    edge => edge.node.frontmatter.slug === slug
  ).node;
  const allPosts = props.data.allMarkdownRemark.edges
  const currentIndex = allPosts.findIndex(post => post.node.frontmatter.slug === slug)
  const next = useRef(null);
  const previous = useRef(null);

  if (currentIndex > 0){
    next.current = JSON.stringify(allPosts[currentIndex - 1].node.frontmatter.slug).replace(`"`,'').replace(`"`,'');
  }
  if (currentIndex < allPosts.length - 1) {
    previous.current = JSON.stringify(allPosts[currentIndex + 1].node.frontmatter.slug).replace(`"`,'').replace(`"`,'');
  }

  return (
    <>
      <div className={postStyles.content}>
        <div>
          <Link to={`/${prefix}/blog/`} className={postStyles.previous}>
            {labels.back}
          </Link>
        </div>
        <h1>{posting.frontmatter.title}</h1>
        <div className={postStyles.meta}>
          <p>{labels.posted} {posting.frontmatter.date}{' '}
          <span> / </span> {posting.frontmatter.timeToRead} {labels.readingTime}
          <br/>
            {labels.tags}:
            {posting.frontmatter.tags.map((tag) => {
                return (<>  <Link to={`/${prefix}/blog/tags/${tag}`} className={postStyles.tags}>{tag}</Link></>);})}
            </p>
        </div>
        <div className={postStyles.authorContainer}>
          <GatsbyImage 
            className={postStyles.authorPic}
            image={props.data.datoCmsSiteInfo.authorIcon.gatsbyImageData}
          />
          <div className={postStyles.authorDescrip}>
            <p>Karolina Ryzińska · <Link to={`/${prefix}/contact`} className={postStyles.link}>{labels.follow}</Link></p>
          </div>
        </div>
        {
          posting.frontmatter.featured && (
            <GatsbyImage
              className={postStyles.featured}
              image={posting.frontmatter.featured.childImageSharp.gatsbyImageData}
              alt={posting.frontmatter.altfeatured}
            />
          )
        }
        <div className={postStyles.html}>
          <div dangerouslySetInnerHTML={{
            __html: posting.html,
          }}></div>
        </div>
      </div>
      <div>
        <span className={postStyles.shareBtn}>
          <FacebookShareButton
            url={url + slug}
          >
            <img src={Fb} height={16} alt="Facebook"/>
          </FacebookShareButton>
          <TwitterShareButton
            url={url + slug}
          >
            <img src={Tw} height={16} alt="Twitter"/>
          </TwitterShareButton>
          <LinkedinShareButton
            url={url + slug}
          >
            <img src={Li} height={16} alt="Linkedin"/>
          </LinkedinShareButton>
        </span>
      </div>
      <div className={postStyles.navContainer}>
        <div className={postStyles.previous}>
          {previous.current !== null && (
            <Link to={`/${prefix}/blog/${previous.current}`}>
              {labels.previous}
            </Link>
          )}
        </div>
        <div className={postStyles.next}>
          {next.current !== null && (
            <Link to={`/${prefix}/blog/${next.current}`}>
              {labels.previous}
            </Link>
          )}
        </div>
      </div>
      <Comments />
    </>
  );
};

export default BlogPost;