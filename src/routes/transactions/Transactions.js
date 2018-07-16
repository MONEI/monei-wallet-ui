import React, {Fragment} from 'react';
import TransactionItem from './TransactionItem';
import Spinner from 'components/Spinner';
import InfiniteScroll from 'react-infinite-scroller';
import groupBy from 'lodash.groupby';
import moment from 'moment';
import styled from 'styled-components';

const List = styled(InfiniteScroll)`
  background: #fff;
  border: 1px solid #e8e8e8;
`;

const Separator = styled.div`
  padding: 6px 20px;
  border-bottom: 1px solid #e8e8e8;
  background: #f9f9f9;
`;

const EmptyList = styled.div`
  background: #fff;
  border: 1px solid #e8e8e8;
  text-align: center;
  padding: 20px;
  color: #8c8c8c;
`;

const Transactions = ({loading, error, transactions, loadMore}) => {
  if (loading) return <Spinner size="large" />;

  if (transactions.items.length === 0)
    return <EmptyList>You don't have any transactions yet</EmptyList>;

  const groupedTransactions = groupBy(transactions.items, trx =>
    moment(trx.createdAt)
      .startOf('day')
      .calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd, D MMMM',
        sameElse: 'dddd, D MMMM, YYYY'
      })
  );

  return (
    <List
      loadMore={loadMore}
      hasMore={transactions.items.length < transactions.total}
      loader={<Spinner key={0} inline />}
      initialLoad={false}>
      {Object.keys(groupedTransactions).map(day => (
        <Fragment key={day}>
          <Separator>{day}</Separator>
          {groupedTransactions[day].map(item => <TransactionItem key={item.id} item={item} />)}
        </Fragment>
      ))}
    </List>
  );
};

export default Transactions;
