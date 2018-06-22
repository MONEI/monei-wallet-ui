# MONEI Wallet UI
[![Build Status](https://travis-ci.org/MONEI/monei-wallet-ui.svg?branch=master)](https://travis-ci.org/MONEI/monei-wallet-ui)

User interface for [MONEI Wallet](https://github.com/MONEI/monei-wallet-serverless)

## Technological stack 

- [create-react-app](https://github.com/facebook/create-react-app)
- [aws-amplify](https://github.com/aws/aws-amplify)
- [aws-appsync](https://github.com/awslabs/aws-mobile-appsync-sdk-js)
- [ant.design](https://ant.design/)
- [styled-components](https://github.com/styled-components/styled-components)

## Setup

- change [.env.develop](.env.develop) to point to your back-end
- `yarn install`
- `yarn run start:develop`

## Deployment

- `yarn global add awsmobile-cli`
- `awsmobile configure`
- `awsmobile init`
- `awsmobile push`
