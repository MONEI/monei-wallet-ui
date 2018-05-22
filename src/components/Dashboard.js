import React, {Component} from 'react';
import {Layout} from 'antd';
import Header from './Header';
import Balance from './Balance';

const {Content, Footer} = Layout;

class Dashboard extends Component {
  render() {
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header changeState={this.props.onStateChange} username={this.props.authData.username}/>
        <Layout className="main-layout">
          <Content className="main-content">
            <Balance />
          </Content>
        </Layout>
        <Footer className="main-footer">
          ©2018{' '}
          <a href="https://monei.net" rel="noopener noreferrer" target="_blank">
            monei.net
          </a>
        </Footer>
      </Layout>
    );
  }
}

export default Dashboard;
