import React from 'react';
import { Link, graphql } from 'gatsby';
import { StructuredText } from "react-datocms";
import { useTranslation } from 'react-i18next';
import * as postStyles from '../styles/blogPost.module.scss';

// title, html
const Test = (props) => {
  const { t } = useTranslation()
  console.log(props)
  const posting = props.data.post

  return (
    <>
      <div >
        <div>
          <Link to='/blog/' >
            {t('blogitems.back')}
          </Link>
        </div>
        <h1 style={{color: 'white'}}>{posting.title}</h1>
        <div className={postStyles.html}>
            <StructuredText data={posting.markdown} />
        </div>
      </div>
    </>
  );
};

export default Test;

export const test = graphql`
query {
  post: datoCmsPost {
    markdown {
        value
    }
    title
  }
}
`;