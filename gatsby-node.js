/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

const path = require('path');
const _ = require("lodash")

// exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === 'MarkdownRemark') {
//     const slug = path.basename(node.fileAbsolutePath, '.md');
//     createNodeField({
//       node,
//       name: 'slug',
//       value: slug,
//     });
//   }
// };

exports.createPages = async ({ graphql, actions }) => { 
  const templates = {
    post: path.resolve('./src/templates/blog-post.js'),
    postList: path.resolve('./src/templates/blog-list.js'),
    tagList: path.resolve('./src/templates/blog-tags.js')
  }
  const { createPage } = actions;
  const locales = ["en", "pl", "no"];

  await Promise.all(
    locales.map(async (locale) => {
      const response = await graphql(`
        query NodeQuery($locale: String){
          posts: allMarkdownRemark (
            sort: { frontmatter: { date: DESC }}
            limit: 1000
            filter: {frontmatter: {slug: {ne: null}, locale: {eq: $locale}}}
          ){
            edges {
              node {
                frontmatter {
                  slug
                  locale
                }
              }
            }
          }
          tags: allMarkdownRemark(limit: 1000) {
            group(field: { frontmatter: { tags: SELECT } }){
              fieldValue
            }
          }
        }`,  {locale: locale});
      if (response.errors) return Promise.reject(response.errors);
      const posts = response.data.posts.edges

      const prefix = `/${locale}`;

      ["contact", "about", "repos", "home"].forEach(page => {
        createPage({
          path: `${prefix}/${page}`,
          component: path.resolve(`./src/templates/${page}.js`),
          context: { locale: locale }
        });
      })

      posts.forEach((edge) => {
        createPage({
          path: `${prefix}/blog/${edge.node.frontmatter.slug}`,
          component: templates.post,
          context: {
            locale: locale,
            slug: edge.node.frontmatter.slug,
          },
        });
      });

      const tags = response.data.tags.group
      tags.forEach(tag => {
        createPage({
          path: `${prefix}/blog/tags/${tag.fieldValue}/`,
          component: templates.tagList,
          context: {
            locale: locale,
            tag: tag.fieldValue,
          },
        })
      })

      const postsPerPage = 10
      const numberOfPages = Math.ceil(posts.length / postsPerPage)

      Array.from({ length: numberOfPages }).forEach((_, index) => {
        createPage({
          path: index === 0 ? `${prefix}/blog` : `${prefix}/blog/${index + 1}`,
          component: templates.postList,
          context: {
            locale: locale,
            limit: postsPerPage,
            skip: index * postsPerPage,
            numberOfPages: numberOfPages,
            currentPage: index + 1,
          },
        })
      })

    })
  )
}
