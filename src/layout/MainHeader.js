import {Icon, Layout} from 'antd';
import {GetBalanceQuery} from 'api/queries';
import {Spacer} from 'globalStyles';
import React from 'react';
import {graphql} from 'react-apollo';
import styled from 'styled-components';

const Header = styled(Layout.Header)`
  display: flex;
  position: fixed;
  right: 0;
  left: 0;
  z-index: 10;
  padding-left: 0 !important;
  color: rgba(255, 255, 255, 0.65);
`;

const Logo = styled.div`
  color: #fff;
  font-size: 1.5em;
  width: 199px;
  text-align: center;
  margin-right: 50px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.1);
`;

const Info = styled.div`
  line-height: 20px;
  font-size: 1.3em;
  align-self: center;
  padding-bottom: 5px;
`;

const Username = styled.div`
  margin-right: 20px;
`;

const Logout = styled.div`
  cursor: pointer;
  font-weight: bold;
`;

const MainHeader = ({logout, username, data: {loading, error, balance = 0}}) => {
  return (
    <Header>
      <Logo>MONEI Wallet</Logo>
      {!loading && <Info>Your balance {(balance / 100).toFixed(2)} EURM</Info>}
      <Spacer />
      <Username>Hi, {username}</Username>
      <Logout>
        <Icon type="logout" onClick={logout} />
      </Logout>
    </Header>
  );
};

export default graphql(GetBalanceQuery)(MainHeader);
