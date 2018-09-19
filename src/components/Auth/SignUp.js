import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import * as Auth from 'lib/Auth';
import {SignUp} from 'aws-amplify-react';
import {isValidNumber} from 'libphonenumber-js/custom';
import metadata from 'libphonenumber-js/metadata.min.json';

class CustomSignUp extends SignUp {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    const {form} = this.props;
    form.validateFields((error, {username, name}) => {
      if (error) return;
      this.setState({isLoading: true});
      Auth.signUp({username, name})
        .then(user => {
          this.setState({isLoading: false});
          this.changeState('verifyCode', user);
        })
        .catch(err => {
          console.log(err);
          this.setState({isLoading: false});
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
          {getFieldDecorator('name')(
            <Input
              size="large"
              autoFocus
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Your Name"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: 'please input a valid phone number!',
                validator(rule, value = '', cb) {
                  isValidNumber(value, metadata) ? cb() : cb(true);
                }
              }
            ]
          })(
            <Input
              size="large"
              prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="+14325551212"
              type="tel"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            loading={this.state.isLoading}
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
