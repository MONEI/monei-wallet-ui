import React, {Component} from 'react';
import {Card, Form, Input, Button} from 'antd';
import {Auth} from 'aws-amplify';

class Account extends Component {
  state = {
    loading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const {form} = this.props;
    form.validateFields(async (error, data) => {
      let user = await Auth.currentAuthenticatedUser();
      let result = await Auth.updateUserAttributes(user, data);
      user = await Auth.currentUserInfo();
      console.log(result, user); // SUCCESS
    });
  };

  render() {
    const {user, authData} = this.props;
    console.log(authData);
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Card title="Personal data" style={{maxWidth: 550}}>
          <dl>
            <dt>Name</dt>
            <dd>{user.name}</dd>
            <dt>Phone number</dt>
            <dd>{user.phone_number}</dd>
            <dt>Wallet address</dt>
            <dd>{user.eth_address}</dd>
          </dl>

          <Form onSubmit={this.handleSubmit}>
            <Form.Item>{getFieldDecorator('name')(<Input placeholder="Your Name" />)}</Form.Item>
            <Form.Item>
              <Button loading={this.state.loading} type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapPropsToFields = props => ({
  name: Form.createFormField({value: props.user.name})
});

export default Form.create({mapPropsToFields})(Account);
