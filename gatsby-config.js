/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

const dotenv = require('dotenv');
dotenv.config();

const { githubApiQuery } = require('./github-api');

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  // flags: {
  //   DEV_SSR: true
  // },
  siteMetadata: {
    title: `Kryzin`,
    description: `Created based on tutorial by Ibas Majid`,
    author: `kryzin`,
  },
  plugins: [
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/about`, `/repos`, `/contact`],
      },
    },
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-page-progress`,
      options: {
        includePaths: [{ regex: "^/blog/" }],
        excludePaths: ['/blog'],
        height: 2,
        color: `#EBA8DE`,
      }
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'posts',
        engine: 'flexsearch',
        query: `
          query {
            allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
              edges {
                  node {
                      id
                      excerpt
                      frontmatter {
                          slug
                          tags
                          date
                          featured {
                              childImageSharp {
                                  gatsbyImageData
                              }
                          }
                          title
                      }
                      timeToRead
                  }
              }
            }
          }
        `,
        ref: 'slug',
        index: ['tags', 'title'],
        store:['title', 'excerpt', 'date', 'slug', 'id', 'tags', 'featured'],
        normalizer: ({data}) => 
          data.allMarkdownRemark.edges.map(item => ({
            title: item.node.frontmatter.title,
            excerpt: item.node.excerpt,
            date: item.node.frontmatter.date,
            slug: item.node.frontmatter.slug,
            id: item.node.id,
            tags: item.node.frontmatter.tags,
            featured: item.node.frontmatter.featured,
          })),
      }
    },
    `gatsby-plugin-fix-fouc`,
    {
      resolve: 'gatsby-omni-font-loader',
      options: {
        mode: 'async',
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `CourierPrime`,
            file: `https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap`,
          },
          {
            name: `VT323`,
            file: `https://fonts.googleapis.com/css2?family=VT323&display=swap`,
          },
          
        ]
      }
    },
    {
      resolve: 'gatsby-source-github-api',
      options: {
        url: "https://api.github.com/graphql",
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        graphQLQuery: githubApiQuery,
        variables: {
          github_login: process.env.GITHUB_LOGIN
        }
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-emoji`,
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: false,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: `${__dirname}/src/components/layout.js`
      }
    },
  ],
}
