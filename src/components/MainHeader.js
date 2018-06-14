import React from 'react';
import './MainHeader.css';
import {Layout, Icon} from 'antd';
const {Header} = Layout;

const MainHeader = ({logout, username, balance}) => {
  return (
    <Header className="main-header">
      <div className="main-header__logo">MONEI Wallet</div>
      <div className="main-header__balance">Your balance {(balance / 100).toFixed(2)} EURM</div>
      <div className="spacer" />
      <div className="main-header__username">{username}</div>
      <div className="main-header__logout">
        <Icon type="logout" onClick={logout} />
      </div>
    </Header>
  );
};

export default MainHeader;
