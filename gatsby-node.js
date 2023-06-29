/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

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
  const response = await graphql(`
    query {
      allMarkdownRemark {
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
        }
      }
    }
  `);
  response.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      path: `/blog/${edge.node.fields.slug}`,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: edge.node.fields.slug,
      },
      next: next ? `/blog/${edge.next.fields.slug}` : ''
    });
  });
};
