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


// CREATE LOCALES SLUGS FOR:
// ABOUT, 
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
        query($locale: String!) {
          allDatoCmsPost(
            locale: $locale
            sort: {date: DESC}
          ) {
            edges {
              node {
                slug
              }
            }
          }
          tags: allDatoCmsTag {
            nodes {
              name
            }
          }
        }
      `, {locale});
      if (response.errors) return Promise.reject(response.errors);
      const posts = response.data.allDatoCmsPost.edges
      const prefix = `/${locale}`;

      ["contact", "about", "repos"].forEach(page => {
        createPage({
          path: `${prefix}/${page}`,
          component: path.resolve(`./src/templates/${page}.js`),
          context: { locale: locale }
        });
      })

      posts.forEach((edge) => {
        createPage({
          path: `${prefix}/blog/${edge.node.slug}`,
          component: templates.post,
          context: {
            locale: locale,
            slug: edge.node.slug,
          },
        });
      });

      const tags = response.data.tags.nodes || []
      tags.forEach(tag => {
        createPage({
          path: `${prefix}/blog/tags/${tag.name}/`,
          component: templates.tagList,
          context: {
            locale: locale,
            tag: tag.name,
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
