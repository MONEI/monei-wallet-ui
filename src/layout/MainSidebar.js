import React from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Icon, Layout} from 'antd';
import {withRouter} from 'react-router-dom';

const {Sider} = Layout;

const MainSidebar = ({location}) => (
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
);

export default withRouter(MainSidebar);
