import {graphql} from 'react-apollo';
import {TransactionsQuery} from 'api/queries';
import produce from 'immer';
import Transactions from './Transactions';

export default graphql(TransactionsQuery, {
  options: {
    variables: {from: 0}
  },
  props: ({data}) => ({
    loadMore: () => {
      data.fetchMore({
        variables: {from: data.transactions.items.length},
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) return prev;
          return produce(prev, ({transactions}) => {
            transactions.items = transactions.items.concat(fetchMoreResult.transactions.items);
          });
        }
      });
    },
    ...data
  })
})(Transactions);
