import React, {Component} from 'react';
import Amplify, {Auth} from 'aws-amplify';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ConfirmSignIn from './ConfirmSignIn';
import ConfirmSignUp from './ConfirmSignUp';
import {withAuthenticator} from 'aws-amplify-react';
import AWSAppSyncClient from 'aws-appsync';
import {Rehydrated} from 'aws-appsync-react';
import {AUTH_TYPE} from 'aws-appsync/lib/link/auth-link';
import {ApolloProvider} from 'react-apollo';
import MainLayout from './MainLayout';
import {AWSIoTProvider} from 'aws-amplify/lib/PubSub/Providers';
import {BrowserRouter as Router} from 'react-router-dom';
import {message} from 'antd';

message.config({
  top: 11,
  duration: 3,
  maxCount: 3
});

Amplify.configure({
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

class App extends Component {
  logout = async () => {
    await Auth.signOut();
    this.props.onStateChange('signedOut');
    setTimeout(() => client.resetStore(), 0);
  };

  render() {
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

export default withAuthenticator(App, false, [
  <SignIn />,
  <ConfirmSignIn />,
  <SignUp />,
  <ConfirmSignUp />
]);
