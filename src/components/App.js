import React, {Component} from 'react';
import Amplify, {Auth} from 'aws-amplify';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ConfirmSignIn from './ConfirmSignIn';
import ConfirmSignUp from './ConfirmSignUp';
import ForgotPassword from './ForgotPassword';
import {withAuthenticator} from 'aws-amplify-react';
import AWSAppSyncClient from 'aws-appsync';
import {Rehydrated} from 'aws-appsync-react';
import {AUTH_TYPE} from 'aws-appsync/lib/link/auth-link';
import {ApolloProvider} from 'react-apollo';
import Dashboard from './Dashboard';

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
  disableOffline: true
});

class App extends Component {
  logout = async () => {
    await Auth.signOut();
    this.props.onStateChange('signedOut');
    setTimeout(() => {
      client.resetStore();
    }, 0);
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Dashboard {...this.props} logout={this.logout} />
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
  <ForgotPassword />
]);
