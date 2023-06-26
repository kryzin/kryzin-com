import React from 'react';
import Metadata from '../components/metadata';
import ReactMarkdown from 'react-markdown';
import { graphql, useStaticQuery } from 'gatsby';
import * as repoStyles from '../styles/repos.module.scss';
import { useTranslation } from 'react-i18next';

const GitRepos = () => {
  
    const data = useStaticQuery(
        graphql`
          query MyQuery {
            allGithubData {
              nodes {
                data {
                  user {
                    repositories {
                      nodes {
                        description
                        forkCount
                        id
                        name
                        openGraphImageUrl
                        updatedAt(fromNow: true)
                        url
                        primaryLanguage {
                          name
                        }
                        languages {
                          nodes {
                            name
                          }
                        }
                        readme {
                          text
                        }
                        stargazers {
                          totalCount
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
    ) 
    const repos = data.allGithubData.nodes[0].data.user.repositories.nodes
    const { t } = useTranslation()
    return (
        <>
            <Metadata
                title="Github"
                description={t('github.description')}
            />
            <h1>{t('github.title')}</h1>
            <ul>
            {repos.map(repo =>
                <li key={repo.id}>
                <div className={repoStyles.mainBorder}>
                    <div className={repoStyles.image}>
                    <div style={{ flexBasis: '80%' }}>
                        <div style={{ fontWeight: 'bold' }}>
                        <a href={repo.url} target="_blank" rel="noreferrer">
                            {repo.name}
                        </a>
                        </div>
                        <div style={{ fontSize: '0.875rem' }}>
                        {repo.description}
                        </div>
                        <div className={repoStyles.info}>
                        <span style={{ marginRight: '1rem' }}>{repo.forkCount} 🍴</span>
                        <span style={{ marginRight: '1rem' }}>{repo.stargazers.totalCount} ⭐</span>
                        <span style={{ marginRight: '1rem' }}>{t('github.updated')} {repo.updatedAt}</span>
                        <span>{repo.name}</span>
                        </div>
                    </div>
                    <div style={{ flexBasis: '20%' }}>
                        <img src={repo.openGraphImageUrl} alt="repo showcase" width="100"/>
                    </div>
                    </div>
                    {
                    repo.readme &&
                    <div className={repoStyles.readMe}>
                        <ReactMarkdown escapeHtml={false}>
                            {repo.readme.text}
                        </ReactMarkdown>
                    </div>
                    }
                </div>
                </li>
            )}
            </ul>
        </>
    );
};

export default GitRepos;
