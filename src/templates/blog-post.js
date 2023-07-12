import React, { useRef } from 'react';
import { Link, graphql } from 'gatsby';
import * as postStyles from '../styles/blogPost.module.scss';

import Comments from '../components/comments';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'; 
import Fb from '../images/facebook.png';
import Li from '../images/linkedin.png';
import Tw from '../images/twitter.png';
import { GatsbyImage } from 'gatsby-plugin-image';
import { StructuredText } from 'react-datocms/structured-text';

const url = typeof window !== 'undefined' ? window.location.href : '';

export const query = graphql`
  query($locale: String!) {
    datoCmsSiteInfo {
      authorIcon {
        gatsbyImageData(width: 200)
      }
    }
    allDatoCmsPost(sort: {date: DESC}) {
      edges {
        next {
          slug
        }
        previous {
          slug
        }
        node {
          title
          slug
          readingTime
          date(formatString: "DD MMMM YYYY")
          featuredLabel
          featured {
            gatsbyImageData(width: 750)
          }
          tags {
            name
          }
          markdown {
            value
          }
        }
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
  }
`;

const BlogPost = (props) => {
  const prefix = props.pageContext.locale
  const labels = props.data.datoCmsPostPage
  const slug = props.pageContext.slug
  const posting = props.data.allDatoCmsPost.edges.find(
    edge => edge.node.slug === slug
  ).node;
  const allPosts = props.data.allDatoCmsPost.edges
  const currentIndex = allPosts.findIndex(post => post.node.slug === slug)
  const next = useRef(null);
  const previous = useRef(null);
  // const allTags = props.data.allDatoCmsPost.edges.flatMap(edge => edge.node.tags.map(tag => tag.name));
  const tags = props.data.allDatoCmsPost.edges[currentIndex].node.tags.map(tag => tag.name);

  if (currentIndex > 0){
    next.current = JSON.stringify(allPosts[currentIndex - 1].node.slug).replace(`"`,'').replace(`"`,'');
  }
  if (currentIndex < allPosts.length - 1) {
    previous.current = JSON.stringify(allPosts[currentIndex + 1].node.slug).replace(`"`,'').replace(`"`,'');
  }
  console.log(posting.markdown.value.document.children)
  return (
    <>
      <div className={postStyles.content}>
        <div>
          <Link to={`/${prefix}/blog/`} className={postStyles.previous}>
            {labels.back}
          </Link>
        </div>
        <h1>{posting.title}</h1>
        <div className={postStyles.meta}>
          <p>{labels.posted} {posting.date}{' '}
          <span> / </span> {posting.readingTime} {labels.readingTime}
          <br/>
            {labels.tags}:
              {tags.map((tag) => {
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
          posting.featured && (
            <GatsbyImage
              className={postStyles.featured}
              image={posting.featured.gatsbyImageData}
              alt={posting.featuredLabel}
            />
          )
        }
        <div className={postStyles.html}>
        <StructuredText
        data={posting.markdown}
        />
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