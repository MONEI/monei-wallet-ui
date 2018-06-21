import React from 'react';
import {Icon} from 'antd';
import styled from 'styled-components';
import {Spacer} from 'globalStyles';

const getItemColor = ({status, income}) => {
  switch (status) {
    case 'completed':
      return income ? '#389e0d' : null;
    case 'failed':
      return '#fa541c';
    case 'pending':
      return '#9b9b9b';
    default:
      return null;
  }
};

const Item = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  color: ${getItemColor};
  background: ${props => props.status === 'pending' && '#f7f9fc'};
`;

const Desc = styled.div`
  margin: 0 15px;
  max-width: 75%;
`;

const Title = styled.div`
  font-size: 1.3em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(0, 0, 0, 0.65);
`;

const Sub = styled.div`
  color: #9b9b9b;
`;

const Actions = styled.div`
  margin: 0 25px;
`;

const Value = styled.div`
  width: 100px;
  text-align: right;
  font-size: 1.8em;
`;

const PendingIcon = styled.div`
  align-self: center;
  margin-left: 5px;
  font-size: 0.9em;
  color: #cdcdcd;
`;

const getIconType = item => {
  if (item.status === 'failed') return 'close-circle-o';
  if (item.income) return 'plus-circle-o';
  return 'minus-circle-o';
};

const getTitle = item => {
  if (item.income) return item.fromInfo ? item.fromInfo : 'Incoming transaction';
  return item.toInfo ? item.toInfo : 'Outgoing transaction';
};

const TransactionItem = ({item}) => {
  return (
    <Item status={item.status} income={item.income}>
      <Icon type={getIconType(item)} style={{fontSize: 24}} />
      <Desc>
        <Title>{getTitle(item)}</Title>
        <Sub>{item.note}</Sub>
      </Desc>
      <Spacer />
      <Actions>
        <a href={`https://ropsten.etherscan.io/tx/${item.id}`} target="_blank">
          view receipt
        </a>
      </Actions>
      <Value>
        {item.income ? '+' : '-'} {(item.amount / 100).toFixed(2)}
      </Value>
      <PendingIcon>{item.status === 'pending' && <Icon type="clock-circle" />}</PendingIcon>
    </Item>
  );
};

export default TransactionItem;
