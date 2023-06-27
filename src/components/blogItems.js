import React, { Component } from 'react';
import { Link } from 'gatsby';

import Img from 'gatsby-image';
import * as blogStyles from '../styles/blog.module.scss';
import '../styles/style.scss';

const getCategories = (items) => {
    let categoryItems = items.map((item) => {
      return item.node.frontmatter.category;
    });
    let uniqueCategories = new Set(categoryItems);
    let categories = Array.from(uniqueCategories);
    categories = ['all posts', ...categories];
    return categories;
};

class BlogItems extends Component {
  state = {
    items: this.props.items.allMarkdownRemark.edges,
    blogPostItems: this.props.items.allMarkdownRemark.edges,
    categories: getCategories(this.props.items.allMarkdownRemark.edges),
    selectedItem: getCategories(this.props.items.allMarkdownRemark.edges) && getCategories(this.props.items.allMarkdownRemark.edges)[0],
  };

  handleItems = (category) => {
    if (category === 'all posts') {
        this.setState({
          blogPostItems: [...this.state.items],
          selectedItem: category,
        });
      } else {
        this.setState({
          blogPostItems: [
            ...this.state.items.filter((edge) => {
              return edge.node.frontmatter.category === category;
            }),
          ],
          selectedItem: category,
        });
      }
  };

  render() {
    return (
      <ul className={blogStyles.posts}>
        <div className={blogStyles.filterButton}>
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
        </div>
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
                  Posted on {edge.node.frontmatter.date}{' '}
                  <span> / </span> {edge.node.timeToRead} min read
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
                  Read More
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}
// document.documentElement.classList = '';

if (typeof document !== `undefined`) {
  const root = document.documentElement
}

const backgroundColor = getComputedStyle(root).getPropertyValue('--secondary-color');
const color = getComputedStyle(root).getPropertyValue('--primary-color');

const activeButtonClass = {
    backgroundColor: backgroundColor,
    color: color,
};

export default BlogItems;
