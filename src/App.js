import React, {Component} from 'react';
import Amplify, {Auth, Interactions} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react';
import AWSAppSyncClient from 'aws-appsync';
import {Rehydrated} from 'aws-appsync-react';
import {AUTH_TYPE} from 'aws-appsync/lib/link/auth-link';
import {ApolloProvider} from 'react-apollo';
import MainLayout from './layout';
import {AWSIoTProvider} from 'aws-amplify/lib/PubSub/Providers';
import {BrowserRouter as Router} from 'react-router-dom';
import {message} from 'antd';

import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import ConfirmSignIn from './components/Auth/ConfirmSignIn';
import ConfirmSignUp from './components/Auth/ConfirmSignUp';
import ForgotPassword from './components/Auth/ForgotPassword';
import RequireNewPassword from './components/Auth/RequireNewPassword';
import VerifyContact from './components/Auth/VerifyContact';

message.config({
  top: 11,
  duration: 3,
  maxCount: 3
});

// TODO: temp fix, remove when https://github.com/aws/aws-amplify/issues/1075 is closed
const _Interactions = Amplify._components.find(c => c === Interactions);
_Interactions.addPluggable = pluggable => {
  if (pluggable && pluggable.getCategory() === 'Interactions') {
    if (!this._pluggables[pluggable.getProviderName()]) {
      pluggable.configure(this._options.bots);
      this._pluggables[pluggable.getProviderName()] = pluggable;
    } else {
      throw new Error('Bot ' + pluggable.getProviderName() + ' already plugged');
    }
  }
};

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
  <ConfirmSignUp />,
  <ForgotPassword />,
  <VerifyContact />,
  <RequireNewPassword />
]);
