/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

const path = require('path');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const templates = {
    post: path.resolve('./src/templates/blog-post.js'),
    postList: path.resolve('./src/templates/blog-list.js')
  }

  const response = await graphql(`
    query {
      allMarkdownRemark (
        sort: { frontmatter: { date: DESC }}
        limit: 1000
      ){
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (response.errors) return Promise.reject(response.errors)
  const posts = response.data.allMarkdownRemark.edges

  posts.forEach((edge) => {
    createPage({
      path: `/blog/${edge.node.fields.slug}`,
      component: templates.post,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });

  const postsPerPage = 10
  const numberOfPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numberOfPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? `/blog` : `blog/${index + 1}`,
      component: templates.postList,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numberOfPages: numberOfPages,
        currentPage: index + 1,
      },
    })
  })
};
