import React, {Fragment} from 'react';
import './Transactions.css';
import TransactionItem from './TransactionItem';
import {TransactionsQuery} from '../api/queries';
import Spinner from './Spinner';
import {graphql} from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import produce from 'immer';
import groupBy from 'lodash.groupby';
import moment from 'moment';

const Transactions = ({loading, error, transactions, loadMore}) => {
  if (loading) return <Spinner size="large" />;
  if (transactions.items.length === 0) {
    return (
      <div className="trx-list">
        <div className="trx-list__empty">You don't have transactions yet</div>
      </div>
    );
  }

  const groupedTransactions = groupBy(transactions.items, trx =>
    moment(trx.createdAt)
      .startOf('day')
      .format('dddd, D MMMM, YYYY')
  );

  return (
    <InfiniteScroll
      className="trx-list"
      loadMore={loadMore}
      hasMore={transactions.items.length < transactions.total}
      loader={<Spinner key={0} inline />}
      initialLoad={false}>
      {Object.keys(groupedTransactions).map(day => (
        <Fragment key={day}>
          <div className="trx-list-separator">{day}</div>
          {groupedTransactions[day].map(item => <TransactionItem key={item.id} item={item} />)}
        </Fragment>
      ))}
    </InfiniteScroll>
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
