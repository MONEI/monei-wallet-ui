import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {Auth} from 'aws-amplify';
import {ConfirmSignIn} from 'aws-amplify-react';

class VerifyCode extends ConfirmSignIn {
  constructor(props) {
    super(props);
    this._validAuthStates = ['verifyCode'];
  }

  handleSubmit = e => {
    e.preventDefault();
    const {form, authData} = this.props;
    form.validateFields((error, {code}) => {
      if (error) return;
      this.setState({loading: true});
      Auth.sendCustomChallengeAnswer(authData, code)
        .then(user => {
          this.setState({loading: false});
          this.changeState('signedIn', user);
        })
        .catch(err => {
          this.setState({loading: false});
          form.setFields({code: {value: code, errors: [err]}});
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
          {getFieldDecorator('code', {
            rules: [{required: true, message: 'Please input SMS code'}]
          })(
            <Input
              size="large"
              autoFocus
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="code"
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
            Confirm SMS Code
          </Button>
        </Form.Item>
        <div style={{fontSize: 16, textAlign: 'center'}}>
          <a onClick={this.signIn}>Back to login</a>
        </div>
      </Form>
    );
  }
}

export default Form.create()(VerifyCode);
