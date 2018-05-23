import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Auth} from 'aws-amplify';
const {Header} = Layout;

const MainHeader = ({changeState, username}) => {
  const handleMenuClick = ({key}) => {
    if (key === 'logout') Auth.signOut()
      .then(() => changeState('signedOut'))
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
              {username}{' '}
              <Icon type="down" style={{fontSize: 12, margin: 0}} />
            </span>
          }>
          <Menu.Item key="logout">Log out</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
  );
};

export default MainHeader;
