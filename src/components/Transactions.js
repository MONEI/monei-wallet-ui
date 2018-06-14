import React from 'react';
import './Transactions.css';
import TransactionItem from './TransactionItem';
import {TransactionsQuery} from '../api/queries';
import Spinner from './Spinner';
import {graphql} from 'react-apollo';

const Transactions = ({data: {loading, error, transactions}}) => {
  if (loading) return <Spinner />;
  if (transactions.length === 0) {
    return (
      <div className="trx-list">
        <div className="trx-list__empty">You don't have transactions yet</div>
      </div>
    );
  }
  return (
    <div className="trx-list">
      {transactions.map(item => <TransactionItem key={item.id} item={item} />)}
    </div>
  );
};

export default graphql(TransactionsQuery)(Transactions);
