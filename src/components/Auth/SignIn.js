import {Button, Form, Icon, Input} from 'antd';
import {Auth} from 'aws-amplify';
import {SignIn} from 'aws-amplify-react';
import React from 'react';
import {isValidNumber} from 'libphonenumber-js/custom';
import metadata from 'libphonenumber-js/metadata.full.json';

class CustomSignIn extends SignIn {
  handleSubmit = e => {
    e.preventDefault();
    const {form} = this.props;
    form.validateFields((error, {username}) => {
      if (error) return;
      this.setState({loading: true});
      Auth.signIn(username)
        .then(user => {
          this.setState({loading: false});
          this.changeState('verifyCode', user);
        })
        .catch(err => {
          this.setState({loading: false});
          form.setFields({username: {value: username, errors: [err]}});
          this.error(err);
        });
    });
  };

  signUp = e => {
    e.preventDefault();
    this.changeState('signUp');
  };

  showComponent() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: 'Please input a valid phone number!',
                validator(rule, value, cb) {
                  isValidNumber(value, metadata) ? cb() : cb(true);
                }
              }
            ]
          })(
            <Input
              size="large"
              autoFocus
              prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="+14325551212"
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
            Log in
          </Button>
        </Form.Item>
        <div style={{fontSize: 16, textAlign: 'center'}}>
          Or <a onClick={this.signUp}>register now!</a>
        </div>
      </Form>
    );
  }
}

export default Form.create()(CustomSignIn);
