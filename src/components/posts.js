import * as blogStyles from '../styles/blog.module.scss';

import { useStaticQuery, graphql, Link } from "gatsby";
import { useTranslation } from 'react-i18next';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useRef, useState } from "react";
import SearchBar from './searchbar';
import { useFlexSearch } from 'react-use-flexsearch';

const Posts = () => {
    const { t } = useTranslation()
    const data = useStaticQuery(
        graphql`
          query {
            localSearchPosts {
              index
              store
            }
            allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                edges {
                    node {
                        id
                        excerpt
                        fields {
                            slug
                        }
                        frontmatter {
                            category
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
        `
    );
    const index = data.localSearchPosts.index
    const store = data.localSearchPosts.store
    const getCategories = (items) => {
        let categoryItems = items.map((item) => {
            return item.node.frontmatter.category;
        });
        let uniqueCategories = new Set(categoryItems);
        let cats = Array.from(uniqueCategories);
        cats = ['all posts', ...cats];
        return cats;
    };
    const allItems = data.allMarkdownRemark.edges
    const [items, setItems] = useState(allItems)
    const blogItems = useRef(allItems);
    const categories = useRef(getCategories(items).splice(0, 8));
    const selectedItem = useRef(getCategories(items) && getCategories(items)[0]);

    const handleItems = (category) => {
        setItems(allItems)
        if (category === 'all posts') {
            blogItems.current = allItems
            selectedItem.current = category
        } else {
            blogItems.current = []
            allItems.map(edge => {
            if (edge.node.frontmatter.category === category) {
                blogItems.current = [...blogItems.current, edge]
            }
            })
            selectedItem.current = category
        }
        setItems(blogItems.current)
    };

    const unFlattenResults = results =>
    results.map(post => {
        const { date, slug, category, title, id, featured, excerpt} = post;
        return {node: { id, excerpt, fields : { slug }, frontmatter: { title, date, category, featured } }};
    });

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s')
    const [searchQuery, setSearchQuery] = useState(query || '');
    const results = useFlexSearch(searchQuery, index, store);
    const posts = searchQuery ? unFlattenResults(results) : items;
    console.log(JSON.stringify(posts))

    return (
      <div>
        <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        />
        <ul className={blogStyles.posts}>
            <div className={blogStyles.filterButton}>
                {categories.current.map((category, index) => {
                    return (
                        <button
                            type="button"
                            key={index}
                            onClick={() => handleItems(category)}
                            style={
                                selectedItem.current === category ? activeButton : null
                            }
                        >
                            {category}
                        </button>
                    );
                })}
            </div>
            {posts && (posts.map((edge) => {
                return (
                    <li className={blogStyles.post} key={edge.node.id}>
                      <h2>
                        <Link to={`/blog/${edge.node.fields.slug}/`}>
                          {edge.node.frontmatter.title}
                        </Link>
                      </h2>
                      <div className={blogStyles.meta}>
                        <span>
                          {t('blogitems.posted')} {edge.node.frontmatter.date}{' '}
                          <span> / </span> {edge.node.timeToRead} {t('blogitems.read')}
                        </span>
                      </div>
                      {edge.node.frontmatter.featured && (
                        <GatsbyImage
                          className={blogStyles.featured}
                          image={
                            edge.node.frontmatter.featured.childImageSharp.gatsbyImageData
                          }
                          alt={edge.node.frontmatter.title}
                        />
                      )}
                      <p className={blogStyles.excerpt}>
                        {edge.node.excerpt}
                      </p>
                      <div className={blogStyles.button}>
                        <Link to={`/blog/${edge.node.fields.slug}/`}>
                          {t('blogitems.more')}
                        </Link>
                      </div>
                    </li>
                  );
            }))

            }
        </ul>
      </div>
    );

};

const activeButton = {
    backgroundColor: '#000',
    color: '#fff',
}; 

export default Posts;
