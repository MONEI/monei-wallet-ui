import React from 'react';
import './MainLayout.css';
import {Route, NavLink, withRouter} from 'react-router-dom';
import MainHeader from './MainHeader';
import {Layout, Alert, Menu, Icon} from 'antd';
import {graphql, ApolloConsumer} from 'react-apollo';
import {UserQuery} from '../api/queries';
import Spinner from './Spinner';
import Transactions from './Transactions';
import Transfers from './Transfers';
import Notifications from './Notifications';
import Account from './Account';

const {Content, Footer, Sider} = Layout;

const MainLayout = ({logout, location, data: {loading, error, user}}) => {
  if (loading) return <Spinner size="large" />;
  if (error)
    return (
      <Alert message="Error" description={error.graphQLErrors[0].message} type="error" showIcon />
    );
  return (
    <Layout className="main-layout">
      <MainHeader logout={logout} user={user} />
      <Sider className="main-sidebar">
        <Menu
          mode="inline"
          className="main-sidebar__menu"
          activeKey={location.pathname}
          selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Icon type="bars" />
            <NavLink to="/" className="nav-text">
              Transactions
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/transfers">
            <Icon type="credit-card" />
            <NavLink to="/transfers" className="nav-text">
              Transfers
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/account">
            <Icon type="setting" />
            <NavLink to="/account" className="nav-text">
              Account
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
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

export default graphql(UserQuery)(withRouter(MainLayout));
