import React, {Component} from 'react';
import {PubSub, API} from 'aws-amplify/lib/index';
import {UserDataQuery} from '../api/queries';

class Notifications extends Component {
  state = {
    subscribed: false
  };

  static getDerivedStateFromProps(props, state) {
    if (state.subscribed) return state;
    const data = props.client.readQuery({query: UserDataQuery});
    console.log(data);
    API.post('APIGateway', '/attach_policy').then(() => {
      PubSub.subscribe(props.topic).subscribe({
        next: data => console.log('Message received', data.value),
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
