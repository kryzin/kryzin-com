import React from 'react';
import Metadata from '../components/metadata';
import ReactMarkdown from 'react-markdown';
import { graphql, useStaticQuery } from 'gatsby';
import * as repoStyles from '../styles/repos.module.scss';
import { useTranslation } from 'react-i18next';
import Transition from '../components/transitions';

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
    console.log(repos.openGraphImageUrl)
    const { t } = useTranslation()
    return (
        <Transition>
            <Metadata
                title="Github"
                description={t('github.description')}
            />
            <h1 className={repoStyles.content}>{t('github.title')}</h1>
            <div className={repoStyles.repos}>
            {repos.map(repo =>
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
                    <div style={{ flex: '1', flexBasis: '10%' }}>
                        <img
                          className={repoStyles.image}
                          src={repo.openGraphImageUrl}
                          alt="repo showcase"
                        />
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
            )}
            </div>
        </Transition>
    );
};

export default GitRepos;
