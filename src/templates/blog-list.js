import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';

import Img from 'gatsby-image';
import * as blogStyles from '../styles/blog.module.scss';
import '../styles/style.scss';
import PageButtons from '../components/pageButtons';

// const page = 2

// const getCategories = (items) => {
//     let categoryItems = items.map((item) => {
//       return item.node.frontmatter.category;
//     });
//     let uniqueCategories = new Set(categoryItems);
//     let categories = Array.from(uniqueCategories);
//     categories = ['all posts', ...categories];
//     return categories.splice(0, 10);
// };

class BlogItems extends Component {
  state = {
    items: this.props.data.allMarkdownRemark.edges,
    blogPostItems: this.props.data.allMarkdownRemark.edges,
    // categories: getCategories(this.props.data.allMarkdownRemark.edges),
    // selectedItem: getCategories(this.props.data.allMarkdownRemark.edges) && getCategories(this.props.data.allMarkdownRemark.edges)[0],
  };

//   handleItems = (category) => {
//     if (category === 'all posts') {
//         this.setState({
//           blogPostItems: [...this.state.items],
//           selectedItem: category,
//         });
//       } else {
//         this.setState({
//           blogPostItems: [
//             ...this.state.items.filter((edge) => {
//               return edge.node.frontmatter.category === category;
//             }),
//           ],
//           selectedItem: category,
//         });
//       }
//   };

  render() {
    const page = this.props.pageContext.currentPage
    console.log(page)
    return (
    <div>
      <ul className={blogStyles.posts}>
        {/* <div className={blogStyles.filterButton}>
            {this.state.categories.map((category, index) => {
                return (
                <button
                    type="button"
                    key={index}
                    onClick={() => this.handleItems(category)}
                    style={
                        this.state.selectedItem === category ? activeButtonClass : null
                    }
                >
                    {category}
                </button>
                );
            })}
        </div> */}
        {this.state.blogPostItems.map((edge) => {
          return (
            <li className={blogStyles.post} key={edge.node.id}>
              <h2>
                <Link to={`/blog/${edge.node.fields.slug}/`}>
                  {edge.node.frontmatter.title}
                </Link>
              </h2>
              <div className={blogStyles.meta}>
                <span>
                  {Language(0)} {edge.node.frontmatter.date}{' '}
                  <span> / </span> {edge.node.timeToRead} {Language(1)}
                </span>
              </div>
              {edge.node.frontmatter.featured && (
                <Img
                  className={blogStyles.featured}
                  fluid={
                    edge.node.frontmatter.featured.childImageSharp
                      .fluid
                  }
                  alt={edge.node.frontmatter.title}
                />
              )}
              <p className={blogStyles.excerpt}>
                {edge.node.excerpt}
              </p>
              <div className={blogStyles.button}>
                <Link to={`/blog/${edge.node.fields.slug}/`}>
                  {Language(2)}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <PageButtons props={this.props}/>
    </div>
    );
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC }}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
const activeButtonClass = {
    backgroundColor: '#000',
    color: '#fff',
};

const Language = (id) => {
  const lang = 'en'
  if (typeof window !== 'undefined') {
    const lang = localStorage.getItem('current-language');
  }
  const readMore = (lang === 'pl') ? "Czytaj dalej" : 'Read More'
  const posted = (lang === 'pl') ? "Dodano" : 'Posted on'
  const read = (lang === 'pl') ? "min czytania" : 'min read'
  if (id === 0){
    return posted
  }
  if (id === 1){
    return read
  } else {
    return readMore
  }
}

export default BlogItems;

