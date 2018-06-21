import React from 'react';
import './MainHeader.css';
import {Layout, Icon} from 'antd';

const {Header} = Layout;

const MainHeader = ({logout, user}) => {
  return (
    <Header className="main-header">
      <div className="main-header__logo">MONEI Wallet</div>
      <div className="main-header__info">Your balance {(user.balance / 100).toFixed(2)} EURM</div>
      <div className="spacer" />
      <div className="main-header__username">{user.phoneNumber}</div>
      <div className="main-header__logout">
        <Icon type="logout" onClick={logout} />
      </div>
    </Header>
  );
};

export default MainHeader;
