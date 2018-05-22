import React, {Component} from 'react';
import {withAuthenticator} from 'aws-amplify-react';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <Dashboard {...this.props} />
    );
  }
}

export default withAuthenticator(App);
