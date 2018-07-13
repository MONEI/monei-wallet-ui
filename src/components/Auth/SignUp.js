import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import * as Auth from 'lib/Auth';
import {SignUp} from 'aws-amplify-react';

class CustomSignUp extends SignUp {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    const {form} = this.props;
    form.validateFields((error, {username}) => {
      if (error) return;
      this.setState({loading: true});
      Auth.signUp(username)
        .then(user => {
          this.setState({loading: false});
          this.changeState('verifyCode', user);
        })
        .catch(err => {
          console.log(err);
          this.setState({loading: false});
          form.setFields({username: {value: username, errors: [err]}});
          this.error(err);
        });
    });
  };

  signIn = e => {
    e.preventDefault();
    this.changeState('signIn');
  };

  showComponent() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{required: true, message: 'Please input your phone!'}]
          })(
            <Input
              size="large"
              autoFocus
              prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="phone number"
              type="tel"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            loading={this.state.loading}
            size="large"
            type="primary"
            htmlType="submit"
            style={{width: '100%'}}>
            Register
          </Button>
        </Form.Item>
        <div style={{fontSize: 16, textAlign: 'center'}}>
          Or <a onClick={this.signIn}>log in</a>
        </div>
      </Form>
    );
  }
}

export default Form.create()(CustomSignUp);
