import React from 'react';
import {Icon} from 'antd';
import cx from 'classnames';
import moment from 'moment';
import './TransactionItem.css';

const TransactionItem = ({item}) => {
  const getIconType = () => {
    if (item.status === 'failed') return 'close-circle-o';
    if (item.income) return 'plus-circle-o';
    return 'minus-circle-o';
  };
  const getTitle = () => {
    if (item.income) return item.fromInfo ? `from: ${item.fromInfo}` : 'Incoming transaction';
    return item.toInfo ? `to: ${item.toInfo}` : 'Outgoing transaction';
  };
  return (
    <div className={cx('trx-item', `trx-item--${item.status}`, {'trx-item--income': item.income})}>
      <Icon type={getIconType()} style={{fontSize: 24}} />
      <div className="trx-item__desc">
        <div className="trx-item__title">
          <a href={`https://ropsten.etherscan.io/tx/${item.id}`} target="_blank">
            {getTitle()}
          </a>
        </div>
        <div className="trx-item__sub">{item.note}</div>
        <div className="trx-item__sub">{moment(item.createdAt).format('D MMMM, YYYY HH:mm')}</div>
      </div>
      <div className="trx-item__spacer" />
      <div className="trx-item__value">
        {item.income ? '+' : '-'} {(item.amount / 100).toFixed(2)}
      </div>
    </div>
  );
};

export default TransactionItem;
