import React, { useRef } from 'react';
import { Link, graphql } from 'gatsby';
import * as postStyles from '../styles/blogPost.module.scss';
import Img from 'gatsby-image';

import Comments from '../components/comments';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'; 
import Fb from '../images/facebook.png';
import Li from '../images/linkedin.png';
import Tw from '../images/twitter.png';
import Author from '../images/profile.png';
import { useTranslation } from 'react-i18next';

const url = typeof window !== 'undefined' ? window.location.href : '';

export const query = graphql`
  query{
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      ) {
      edges {
        node {
          html
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            tags
            altfeatured
            featured {
              childImageSharp {
                fluid(maxWidth: 750) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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
  const slug = props.pageContext.slug
  const posting = props.data.allMarkdownRemark.edges.find(
    edge => edge.node.fields.slug === slug
  ).node;
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
        <div>
          <Link to='/blog/' className={postStyles.previous}>
            {t('blogitems.back')}
          </Link>
        </div>
        <h1>{posting.frontmatter.title}</h1>
        <div className={postStyles.meta}>
          <p>{t('blogitems.posted')} {posting.frontmatter.date}{' '}
          <span> / </span> {posting.timeToRead} {t('blogitems.read')}
          <br/>
            {t('blogitems.tags')}:
              {posting.frontmatter.tags.map((tag) => {
                return (<>  <Link to={`/blog/tags/${tag}`} className={postStyles.tags}>{tag}</Link></>);})}
            </p>
        </div>
        <div className={postStyles.authorContainer}>
          <img className={postStyles.authorPic} src={Author} alt="author of the post"/>
          <div className={postStyles.authorDescrip}>
            <p>Karolina Ryzińska · <Link to='/contact' className={postStyles.link}>{t('blogitems.follow')}</Link></p>
          </div>
        </div>
        {
          posting.frontmatter.featured && (
            <Img
              className={postStyles.featured}
              fluid={posting.frontmatter.featured.childImageSharp.fluid}
              alt={posting.frontmatter.altfeatured}
            />
          )
        }
        <div className={postStyles.html}>
        <div
          dangerouslySetInnerHTML={{
            __html: posting.html,
          }}
        ></div>
        </div>
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