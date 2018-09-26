import {Layout} from 'antd';
import Notifications from 'components/Notifications';
import React from 'react';
import {ApolloConsumer} from 'react-apollo';
import {Route} from 'react-router-dom';
import Account from 'routes/account';
import Buy from 'routes/buy';

// Routes
import Transactions from 'routes/transactions';
import Sell from 'routes/sell';
import Transfers from 'routes/transfers';
import styled from 'styled-components';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';

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
  min-height: unset !important;
`;

const Footer = styled(Layout.Footer)`
  text-align: center;
`;

const MainLayout = ({onLogout, onUpdateUser, location, authData}) => {
  const user = authData.attributes;
  return (
    <Layout>
      <MainHeader logout={onLogout} username={user.name || user.phone_number} />
      <MainSidebar />
      <Container>
        <Content>
          <Route exact path="/" component={Transactions} />
          <Route path="/transfers" component={Transfers} />
          <Route path="/buy" component={Buy} />
          <Route path="/sell" component={Sell} />
          <Route
            path="/account"
            component={props => <Account {...props} user={user} updateUser={onUpdateUser} />}
          />
        </Content>
        <Footer>
          ©2018{' '}
          <a href="https://monei.net" rel="noopener noreferrer" target="_blank">
            monei.net
          </a>
        </Footer>
      </Container>
      <ApolloConsumer>
        {client => <Notifications topic={user['custom:eth_address']} client={client} />}
      </ApolloConsumer>
    </Layout>
  );
};

export default MainLayout;
