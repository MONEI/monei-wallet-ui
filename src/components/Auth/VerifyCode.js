import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {Auth} from 'aws-amplify';
import {ConfirmSignIn} from 'aws-amplify-react';

class VerifyCode extends ConfirmSignIn {
  constructor(props) {
    super(props);
    this._validAuthStates = ['verifyCode'];
  }

  confirm() {
    const user = this.props.authData;
    const {code} = this.inputs;
    this.setState({loading: true});
    Auth.sendCustomChallengeAnswer(user, code)
      .then(user => {
        this.setState({loading: false});
        this.changeState('signedIn', user);
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

  showComponent(theme) {
    return (
      <Form>
        <Form.Item>
          <Input
            size="large"
            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
            placeholder="code"
            type="tel"
            key="code"
            name="code"
            onChange={this.handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={this.state.loading}
            size="large"
            type="primary"
            htmlType="submit"
            onClick={this.confirm}
            style={{width: '100%'}}>
            Confirm SMS Code
          </Button>
        </Form.Item>
        <div style={{fontSize: 16}}>
          <a onClick={this.signIn}>Back to login</a>
        </div>
      </Form>
    );
  }
}

export default VerifyCode;
