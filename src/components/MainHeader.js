import React from 'react';
import './MainHeader.css';
import {Layout, Icon} from 'antd';
import {formatNumber} from 'libphonenumber-js';

const {Header} = Layout;

const MainHeader = ({logout, user}) => {
  return (
    <Header className="main-header">
      <div className="main-header__logo">MONEI Wallet</div>
      <div className="main-header__info">
        <small>{user.address}</small>
        <div>Your balance {(user.balance / 100).toFixed(2)} EURM</div>
      </div>
      <div className="spacer" />
      <div className="main-header__username">{formatNumber(user.phoneNumber, 'International')}</div>
      <div className="main-header__logout">
        <Icon type="logout" onClick={logout} />
      </div>
    </Header>
  );
};

export default MainHeader;
