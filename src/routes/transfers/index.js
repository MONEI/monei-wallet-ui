import {createLocalTransaction} from 'api/utils';
import {NewTransactionMutation} from 'api/mutations';
import {graphql} from 'react-apollo';
import Transfers from './Transfers';

export default graphql(NewTransactionMutation, {
  props: ({mutate}) => ({
    newTransaction: data => {
      return mutate({
        variables: data,
        update: (client, {data: {newTransaction}}) => {
          createLocalTransaction(client, newTransaction);
        }
      });
    }
  })
})(Transfers);
