import React from 'react';
import {Layout} from 'antd';
import Header from './Header';
import Balance from './Balance';
import NewTransactionForm from './NewTransactionForm';
import Transactions from './Transactions';
import {graphql} from 'react-apollo';
import {UserDataQuery} from '../api/queries';
import Spinner from './Spinner';

const {Content, Footer} = Layout;

const Dashboard = ({
  logout,
  data: {loading, error, user, outgoingTransactions, incomingTransactions}
}) => {
  if (loading) return <Spinner />;
  return (
    <Layout style={{minHeight: '100%'}}>
      <Header logout={logout} username={user.email} />
      <Layout className="main-layout">
        <Content className="main-content">
          <Balance user={user} />
          <NewTransactionForm />
          <Transactions
            incomingTransactions={incomingTransactions}
            outgoingTransactions={outgoingTransactions}
          />
        </Content>
      </Layout>
      <Footer className="main-footer">
        ©2018{' '}
        <a href="https://monei.net" rel="noopener noreferrer" target="_blank">
          monei.net
        </a>
      </Footer>
    </Layout>
  );
};

export default graphql(UserDataQuery)(Dashboard);
