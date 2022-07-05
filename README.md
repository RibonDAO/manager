<!---
The main structure of this README was taken from:
https://github.com/open-sauced/open-sauced#readme
-->

<div align="center">
  <br>
  <img alt="Ribon Logo" src="https://ribon.io/wp-content/uploads/2021/03/cropped-Ribon-logo-verde.png" width="300px">
  <h1>Ribon Manager</h1>
</div>
<br>
<p align="center">
  <img src="https://img.shields.io/github/languages/code-size/RibonDAO/interface" alt="GitHub code size in bytes">
  <img src="https://img.shields.io/github/commit-activity/w/RibonDAO/interface" alt="GitHub commit activity">
  <a href="https://github.com/RibonDAO/interface/issues">
    <img src="https://img.shields.io/github/issues/RibonDAO/interface" alt="GitHub issues">
  </a>
  <a href="https://discord.gg/DBcwmDrkpy">
    <img src="https://img.shields.io/discord/341989911450091522.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2" alt="Discord">
  </a>
  <a href="https://twitter.com/RibonDAO">
    <img src="https://img.shields.io/twitter/follow/RibonDAO?label=Follow&style=social" alt="Twitter">
  </a>
</p>

Ribon is a decentralized donation platform that allows donors to become promoters and, by doing so,
encourages others to join them in a global culture of giving. This way it’s possible to increase
donations to charities, promote a culture of giving in the world and make people happier. The
decentralized platform is governed by the community, and this whitepaper is a reader-friendly
description of the Ribon protocol, which is built on Matic/Polygon, a layer 2 in Ethereum.

![ribon-dapp-screencap](https://user-images.githubusercontent.com/24739860/175359784-94a71cb9-fed9-4ad7-bd84-ab43c163a24a.png)

## 📖 Prerequisites

In order to run the project from a local environment we need `node>=16`, `npm>=8` installed on our development machines. We also recommend `yarn>=1.22` to manage dependencies but is optional. The following steps are using the yarn CLI.

**NOTE:** You may will need the .env file with some environment variables. You can get it by accessing our [Discord Server](https://discord.gg/DBcwmDrkpy) and requesting it on the #Development channel

## 🖥️ Local development

To clone the repo:

```shell
git clone git@github.com:RibonDAO/manager.git
```

To install the application:

```shell
yarn install
```

To start a local copy of the app on port `3000`:

```shell
yarn start
```

### 🧪 Test

For running the test suite, use the following command. Since the tests run in watch mode by default, some users may encounter errors about too many files being open. In this case, it may be beneficial to [install watchman](https://facebook.github.io/watchman/docs/install.html).

```shell
yarn test
```

You can request a coverage report by running the following command:

```shell
yarn testCoverage
```

### 🎨 Code linting

To check the code and styles quality, use the following command:

```shell
yarn lint
```

## 🤝 Contributing

We encourage you to contribute! Please check out the [Contributing guide](https://ribondao.github.io/docs/) for guidelines about how to proceed.

## 🍕 Community

Got Questions? Join the conversation in our [Discord](https://discord.gg/DBcwmDrkpy).  
Find RibonDAO updates in our [Twitter](https://www.twitter.com/RibonDAO).
