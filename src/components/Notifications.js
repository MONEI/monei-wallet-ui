import React, {Component} from 'react';
import {PubSub, API} from 'aws-amplify/lib/index';
import {UserDataQuery} from '../api/queries';

class Notifications extends Component {
  state = {
    subscribed: false
  };

  static dispatchAction(client, action) {
    console.log(action);
    client.query({query: UserDataQuery, fetchPolicy: 'network-only'});
  }

  static getDerivedStateFromProps({topic, client}, state) {
    if (state.subscribed) return state;
    API.post('APIGateway', '/attach_policy').then(() => {
      PubSub.subscribe(topic).subscribe({
        next: data => Notifications.dispatchAction(client, data.value),
        error: error => console.error(error),
        close: () => console.log('Done')
      });
    });
    state.subscribed = true;
    return state;
  }

  render() {
    return null;
  }
}

export default Notifications;
