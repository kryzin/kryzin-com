# [KRYZIN - made with Gatsby](https://kryzin.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/057db4e3-0b0b-4fa6-9ff0-df60a20f3780/deploy-status)](https://app.netlify.com/sites/kryzin/deploys)

## Currently working on

**Adding next:**

- Bugs
  - pressing enter on search doesn't pass params to url

**Might add in the future:**

- Title of post stays at the top of window
- Author token at top of post
- testing with jest/react testing lib
- Font Size switch
- Adjust utterance with Theme Mode
  - Done BUT - needs page reload to change
- Some basic cookie policy in footer + settings + pop-up banner

**Styles, themes, modes etc.**

- test config env (customEnv for jest??)
- 3d pixel background (framer-motion onScroll)

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
