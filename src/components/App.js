import React, {Component} from 'react';
import {Layout} from 'antd';
import Header from './Header';
import Balance from './Balance';
import {Auth} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react';

const {Content, Footer} = Layout;

class App extends Component {
  state = {
    profile: {}
  };

  componentDidMount() {
    this.getUser();
  }

  async getUser() {
    const data = await Auth.currentUserInfo();
    this.setState({
      profile: {
        email: data.attributes.email,
        address: data.attributes['custom:eth_address']
      }
    });
  }

  render() {
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header changeState={this.props.onStateChange} username={this.props.authData.username} />
        <Layout className="main-layout">
          <Content className="main-content">
            <Balance address={this.state.profile.address} />
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

export default withAuthenticator(App);
