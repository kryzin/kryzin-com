exports.githubApiQuery = `
query($github_login: String!) {
    user(login: $github_login) {
      name
      repositories(privacy: PUBLIC, first: 10) {
        nodes {
            id
            name
            description
            url
            updatedAt
            forkCount
            openGraphImageUrl
            stargazers {
              totalCount
            }
            readme: object(expression: "master:README.md") {
              ... on Blob {
                text
              }
            }
            licenseInfo {
              id
            }
            primaryLanguage {
              name
            }
            languages(first: 10) {
              nodes {
                name
              }
            }
        }
      }
    }
  }
`