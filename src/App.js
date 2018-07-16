import {message} from 'antd';
import Amplify, {Auth} from 'aws-amplify';
import {AWSIoTProvider} from '@aws-amplify/pubsub';
import AWSAppSyncClient from 'aws-appsync';
import {Rehydrated} from 'aws-appsync-react';
import {AUTH_TYPE} from 'aws-appsync/lib/link/auth-link';
import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router} from 'react-router-dom';
import aws_exports from './aws-exports';
import {withAuthenticator} from './components/Auth';
import MainLayout from './layout';

message.config({
  top: 11,
  duration: 3,
  maxCount: 3
});

Amplify.configure({
  ...aws_exports,
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    mandatorySignIn: true
  },
  API: {
    endpoints: [
      {
        name: 'APIGateway',
        region: process.env.REACT_APP_REGION,
        endpoint: process.env.REACT_APP_API_ENDPOINT
      }
    ]
  }
});

Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: process.env.REACT_APP_REGION,
    aws_pubsub_endpoint: process.env.REACT_APP_IOT_ENDPOINT
  })
);

const client = new AWSAppSyncClient({
  url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  region: process.env.REACT_APP_REGION,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  },
  disableOffline: true
});

//Amplify.Logger.LOG_LEVEL = 'DEBUG';

class App extends Component {
  logout = async () => {
    await Auth.signOut();
    this.props.onStateChange('signedOut');
    setTimeout(() => client.resetStore(), 0);
  };

  render() {
    console.log(this.props);
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Router>
            <MainLayout {...this.props} logout={this.logout} />
          </Router>
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

export default withAuthenticator(App);
