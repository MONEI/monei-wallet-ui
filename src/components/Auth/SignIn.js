import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {Auth} from 'aws-amplify';
import {SignIn} from 'aws-amplify-react';

class CustomSignIn extends SignIn {
  signIn = () => {
    const {username} = this.inputs;
    this.setState({loading: true});
    Auth.signIn(username)
      .then(user => {
        this.setState({loading: false});
        this.changeState('verifyCode', user);
      })
      .catch(err => {
        this.setState({loading: false});
        if (err.code === 'UserNotConfirmedException') {
          console.log('the user is not confirmed');
          this.changeState('confirmSignUp');
        } else {
          this.error(err);
        }
      });
  };

  signUp = e => {
    e.preventDefault();
    this.changeState('signUp');
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
            onClick={this.signIn}
            style={{width: '100%'}}>
            Log in
          </Button>
        </Form.Item>
        <div style={{fontSize: 16}}>
          Or <a onClick={this.signUp}>register now!</a>
        </div>
      </Form>
    );
  }
}

export default CustomSignIn;
