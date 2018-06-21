import React from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Icon, Layout} from 'antd';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

const Sider = styled(Layout.Sider)`
  background: #fff !important;
  position: fixed !important;
  top: 64px;
  bottom: 0;
  border-right: 1px solid #e8e8e8;
`;

const MainMenu = styled(Menu)`
  border-right: 0;
`;

const Link = styled(NavLink)`
  display: inline-block !important;
`;

const MainSidebar = ({location}) => (
  <Sider className="main-sidebar">
    <MainMenu mode="inline" activeKey={location.pathname} selectedKeys={[location.pathname]}>
      <Menu.Item key="/">
        <Icon type="bars" />
        <Link to="/" className="nav-text">
          Transactions
        </Link>
      </Menu.Item>
      <Menu.Item key="/transfers">
        <Icon type="credit-card" />
        <Link to="/transfers" className="nav-text">
          Transfers
        </Link>
      </Menu.Item>
      <Menu.Item key="/account">
        <Icon type="setting" />
        <Link to="/account" className="nav-text">
          Account
        </Link>
      </Menu.Item>
    </MainMenu>
  </Sider>
);

export default withRouter(MainSidebar);
