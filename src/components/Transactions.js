import React from 'react';
import {graphql} from 'react-apollo';
import {TransactionsQuery} from '../api/queries';
import TrxItem from './TrxItem';

const Transactions = ({data: {loading, error, incomingTransactions, outgoingTransactions}}) => {
  if (loading) return null;
  const incoming = incomingTransactions.items.map(item => {
    item.income = true;
    return item;
  });
  const transactions = incoming.concat(outgoingTransactions.items);
  const sortedTransactions = transactions.sort((a, b) => a.createdAt < b.createdAt);
  if (sortedTransactions.length === 0) {
    return <div className="trx-empty-list">You don't have transactions yet</div>;
  }
  return (
    <div className="trx-list">
      {sortedTransactions.map(item => <TrxItem key={item.id} item={item} />)}
    </div>
  );
};

export default graphql(TransactionsQuery)(Transactions);
