import React, {Component} from 'react';
import {Layout, Alert} from 'antd';
import Header from './Header';
import Balance from './Balance';
import NewTransactionForm from './NewTransactionForm';
import Transactions from './Transactions';
import {graphql} from 'react-apollo';
import {UserDataQuery} from '../api/queries';
import Spinner from './Spinner';
import Notifications from './Notifications';
import {ApolloConsumer} from 'react-apollo';

const {Content, Footer} = Layout;

class Dashboard extends Component {
  render() {
    const {
      logout,
      data: {loading, error, user, outgoingTransactions, incomingTransactions}
    } = this.props;
    if (loading) return <Spinner />;
    if (error)
      return (
        <Alert message="Error" description={error.graphQLErrors[0].message} type="error" showIcon />
      );
    return (
      <Layout style={{minHeight: '100%'}}>
        <ApolloConsumer>
          {client => <Notifications topic={user.address} client={client} />}
        </ApolloConsumer>

        <Header logout={logout} username={user.phoneNumber} />
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
  }
}

export default graphql(UserDataQuery)(Dashboard);
