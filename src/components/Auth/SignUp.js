import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {Auth} from 'aws-amplify';
import {SignUp} from 'aws-amplify-react';

class CustomSignUp extends SignUp {
  signUp() {
    const {username} = this.inputs;
    this.setState({loading: true});
    Auth.signUp(username)
      .then(user => {
        this.setState({loading: false});
        this.changeState('verifyCode', user);
      })
      .catch(err => {
        this.setState({loading: false});
        this.error(err);
      });
  }

  signIn = e => {
    e.preventDefault();
    this.changeState('signIn');
  };

  showComponent() {
    return (
      <Form>
        <Form.Item>
          <Input
            size="large"
            prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}} />}
            placeholder="phone number"
            type="tel"
            key="username"
            name="username"
            onChange={this.handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={this.state.loading}
            size="large"
            type="primary"
            htmlType="submit"
            onClick={this.signUp}
            style={{width: '100%'}}>
            Register
          </Button>
        </Form.Item>
        <div style={{fontSize: 16}}>
          Or <a onClick={this.signIn}>log in</a>
        </div>
      </Form>
    );
  }
}

export default CustomSignUp;
