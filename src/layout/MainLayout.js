import React from 'react';
import './MainLayout.css';
import {Route} from 'react-router-dom';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import {Layout, Alert} from 'antd';
import {graphql, ApolloConsumer} from 'react-apollo';
import {UserQuery} from 'api/queries';
import Spinner from 'components/Spinner';
import Notifications from 'components/Notifications';

// Routes
import Transactions from 'routes/transactions';
import Transfers from 'routes/transfers';
import Account from 'routes/account';

const {Content, Footer} = Layout;

const MainLayout = ({logout, location, data: {loading, error, user}}) => {
  if (loading) return <Spinner size="large" />;
  if (error)
    return (
      <Alert message="Error" description={error.graphQLErrors[0].message} type="error" showIcon />
    );
  return (
    <Layout className="main-layout">
      <MainHeader logout={logout} user={user} />
      <MainSidebar />
      <Layout className="main-layout__inner">
        <Content className="main-layout__content">
          <Route exact path="/" component={Transactions} />
          <Route path="/transfers" component={Transfers} />
          <Route path="/account" component={props => <Account {...props} user={user} />} />
        </Content>
        <Footer className="main-footer">
          ©2018{' '}
          <a href="https://monei.net" rel="noopener noreferrer" target="_blank">
            monei.net
          </a>
        </Footer>
      </Layout>
      <ApolloConsumer>
        {client => <Notifications topic={user.address} client={client} />}
      </ApolloConsumer>
    </Layout>
  );
};

export default graphql(UserQuery)(MainLayout);
