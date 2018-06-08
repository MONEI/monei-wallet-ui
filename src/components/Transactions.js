import React from 'react';
import TrxItem from './TrxItem';

const Transactions = ({transactions}) => {
  if (transactions.length === 0) {
    return <div className="trx-empty-list">You don't have transactions yet</div>;
  }
  return (
    <div className="trx-list">
      {transactions.map(item => <TrxItem key={item.id} item={item} />)}
    </div>
  );
};

export default Transactions;
