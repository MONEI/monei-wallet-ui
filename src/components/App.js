import React, {Component} from 'react';
import {Layout} from 'antd';
import Header from './Header';
import Balance from './Balance';
import Transactions from './Transactions';
import Amplify, {Auth} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react';
import AWSAppSyncClient from 'aws-appsync';
import {Rehydrated} from 'aws-appsync-react';
import {AUTH_TYPE} from 'aws-appsync/lib/link/auth-link';
import {ApolloProvider} from 'react-apollo';

Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: true
  }
});

const client = new AWSAppSyncClient({
  url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  region: process.env.REACT_APP_REGION,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  },
  disableOffline: process.env.NODE_ENV === 'development'
});

const {Content, Footer} = Layout;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Layout style={{minHeight: '100%'}}>
            <Header
              changeState={this.props.onStateChange}
              username={this.props.authData.username}
            />
            <Layout className="main-layout">
              <Content className="main-content">
                <Balance />
                <Transactions />
              </Content>
            </Layout>
            <Footer className="main-footer">
              ©2018{' '}
              <a href="https://monei.net" rel="noopener noreferrer" target="_blank">
                monei.net
              </a>
            </Footer>
          </Layout>
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

export default withAuthenticator(App);
