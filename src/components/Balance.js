import React from 'react';
import './Balance.css';

const Balance = ({user}) => (
  <div className="balance">
    <div className="balance__label">Current balance</div>
    <div className="balance__value">{(user.balance / 100).toFixed(2)} EURM</div>
    <div className="balance__address">{user.address}</div>
  </div>
);

export default Balance;
