# [KRYZIN - made with Gatsby](https://kryzin.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/057db4e3-0b0b-4fa6-9ff0-df60a20f3780/deploy-status)](https://app.netlify.com/sites/kryzin/deploys)

## Currently working on

**Adding next:**

- gifs on homepage and 404
- posts translated + pass the right ones to templates in gatsby-node
- maybe add slugs for other locales to frontmatter for lang switching on post's site
- fix navigation on language change when on homepage
  - add nav links on home to direct to specific lang homepages

## Quick start

1. **Start developing.**

    Navigate into directory and in shell/git bash:

    ```shell
    git clone https://github.com/kryzin/kryzin-com.git
    cd kryzin-com/
    npm install
    ```

    then create a .env file and add:

    ```shell
    GITHUB_LOGIN=your_login
    GITHUB_PERSONAL_ACCESS_TOKEN=your_token
    ```

    to get the token check out [this tutorial!](https://catalyst.zoho.com/help/tutorials/githubbot/generate-access-token.html)

    save and inside your project dir run:

    ```shell
    gatsby develop
    ```
