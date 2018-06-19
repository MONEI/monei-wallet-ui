import React from 'react';
import {Icon} from 'antd';
import cx from 'classnames';
import {formatIfPhone} from '../lib/utils';
import './TransactionItem.css';

const TransactionItem = ({item}) => {
  const getIconType = () => {
    if (item.status === 'failed') return 'close-circle-o';
    if (item.income) return 'plus-circle-o';
    return 'minus-circle-o';
  };
  const getTitle = () => {
    if (item.income)
      return item.fromInfo ? `from: ${formatIfPhone(item.fromInfo)}` : 'Incoming transaction';
    return item.toInfo ? `to: ${formatIfPhone(item.toInfo)}` : 'Outgoing transaction';
  };
  return (
    <div className={cx('trx-item', `trx-item--${item.status}`, {'trx-item--income': item.income})}>
      <Icon type={getIconType()} style={{fontSize: 24}} />
      <div className="trx-item__desc">
        <div className="trx-item__title">{getTitle()}</div>
        <div className="trx-item__sub">{item.note}</div>
      </div>
      <div className="trx-item__spacer" />
      <div className="trx-item__actions">
        <a href={`https://ropsten.etherscan.io/tx/${item.id}`} target="_blank">
          view receipt
        </a>
      </div>
      <div className="trx-item__value">
        {item.income ? '+' : '-'} {(item.amount / 100).toFixed(2)}
      </div>
    </div>
  );
};

export default TransactionItem;
