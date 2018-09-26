import {NewWithdrawalMutation} from 'api/mutations';
import {graphql} from 'react-apollo';
import {createLocalTransaction} from 'api/utils';
import Sell from './Sell';

export default graphql(NewWithdrawalMutation, {
  props: ({mutate}) => ({
    newWithdrawal: data => {
      return mutate({
        variables: data,
        update: (client, {data: {newWithdrawal}}) => {
          createLocalTransaction(client, newWithdrawal);
        }
      });
    }
  })
})(Sell);
