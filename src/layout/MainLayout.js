import React from 'react';
import {Route} from 'react-router-dom';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import {Layout, Alert} from 'antd';
import {graphql, ApolloConsumer} from 'react-apollo';
import {UserQuery} from 'api/queries';
import Spinner from 'components/Spinner';
import Notifications from 'components/Notifications';
import styled from 'styled-components';

// Routes
import Transactions from 'routes/transactions';
import Transfers from 'routes/transfers';
import Account from 'routes/account';

const Container = styled(Layout)`
  margin-left: 200px;
  padding-top: 64px;
  height: 100vh;
  overflow: unset !important;
`;

const Content = styled(Layout.Content)`
  max-width: 1200px;
  align-self: center;
  width: 100%;
  padding: 30px 50px;
  position: relative;
`;

const Footer = styled(Layout.Footer)`
  text-align: center;
`;

const MainLayout = ({logout, location, data: {loading, error, user}}) => {
  if (loading) return <Spinner size="large" />;
  if (error)
    return (
      <Alert message="Error" description={error.graphQLErrors[0].message} type="error" showIcon />
    );
  return (
    <Layout>
      <MainHeader logout={logout} user={user} />
      <MainSidebar />
      <Container>
        <Content>
          <Route exact path="/" component={Transactions} />
          <Route path="/transfers" component={Transfers} />
          <Route path="/account" component={props => <Account {...props} user={user} />} />
        </Content>
        <Footer>
          ©2018{' '}
          <a href="https://monei.net" rel="noopener noreferrer" target="_blank">
            monei.net
          </a>
        </Footer>
      </Container>
      <ApolloConsumer>
        {client => <Notifications topic={user.address} client={client} />}
      </ApolloConsumer>
    </Layout>
  );
};

export default graphql(UserQuery)(MainLayout);
