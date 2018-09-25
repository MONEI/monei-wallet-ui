import {NewWithdrawalMutation} from 'api/mutations';
import {graphql} from 'react-apollo';
import Sell from './Sell';

export default graphql(NewWithdrawalMutation, {
  props: ({mutate}) => ({
    newWithdrawal: data => {
      return mutate({
        variables: data,
        update: (client, {data: {newWithdrawal}}) => {
          console.log(newWithdrawal);
        }
      });
    }
  })
})(Sell);
