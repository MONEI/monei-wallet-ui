import {Component} from 'react';
import {PubSub, API} from 'aws-amplify';
import {createLocalTransaction, updateLocalTransaction} from '../api/utils';
import {message} from 'antd/lib';

class Notifications extends Component {
  state = {
    subscribed: false
  };

  static dispatchAction(client, action) {
    console.log(action);
    switch (action.type) {
      case 'TRX_CREATED':
        const trx = action.payload;
        createLocalTransaction(client, trx);
        message.success('New transaction!');
        break;
      case 'TRX_UPDATED':
        updateLocalTransaction(client, action.payload);
        message.success('Transaction confirmed!');
        break;
      default:
        console.log('Unknown action');
    }
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
