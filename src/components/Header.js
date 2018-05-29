import React from 'react';
import {Layout, Menu, Icon} from 'antd';
const {Header} = Layout;

const MainHeader = ({logout, username}) => {
  const handleMenuClick = ({key}) => {
    if (key === 'logout') logout();
  };
  return (
    <Header className="main-header">
      <h2 className="main-logo">MONEI Wallet</h2>
      <Menu
        onClick={handleMenuClick}
        mode="horizontal"
        theme="dark"
        style={{lineHeight: '64px'}}
        triggerSubMenuAction="click">
        <Menu.SubMenu
          title={
            <span>
              {username} <Icon type="down" style={{fontSize: 12, margin: 0}} />
            </span>
          }>
          <Menu.Item key="logout">Log out</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
  );
};

export default MainHeader;
