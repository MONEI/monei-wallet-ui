import React from 'react';
import {graphql} from 'react-apollo';
import {UserQuery} from '../api/queries';
import './Balance.css';

const Balance = ({data: {loading, error, user}}) => {
  if (loading) return null;
  return (
    <div className="balance">
      <div className="balance__label">Current balance</div>
      <div className="balance__value">{user.balance / 100} EURM</div>
      <div className="balance__address">{user.address}</div>
    </div>
  );
};

export default graphql(UserQuery)(Balance);
