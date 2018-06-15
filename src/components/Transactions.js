import React from 'react';
import './Transactions.css';
import TransactionItem from './TransactionItem';
import {TransactionsQuery} from '../api/queries';
import Spinner from './Spinner';
import {graphql} from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import produce from 'immer';

const Transactions = ({loading, error, transactions, loadMore}) => {
  if (loading) return <Spinner size="large" />;
  if (transactions.items.length === 0) {
    return (
      <div className="trx-list">
        <div className="trx-list__empty">You don't have transactions yet</div>
      </div>
    );
  }
  return (
    <div className="trx-list">
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={transactions.items.length < transactions.total}
        loader={<Spinner inline />}
        initialLoad={false}>
        {transactions.items.map(item => <TransactionItem key={item.id} item={item} />)}
      </InfiniteScroll>
    </div>
  );
};

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
