import {Button, Card, Form, Input} from 'antd';
import {compact} from 'lib/utils';
import React, {Component, Fragment} from 'react';

class PersonalData extends Component {
  state = {
    isLoading: false,
    isEditing: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const {form} = this.props;
    form.validateFields((err, data) => {
      if (err) return;
      this.setState({isLoading: true});
      this.props.updateUser(compact(data));
    });
  };

  render() {
    const {user} = this.props;
    const {isLoading, isEditing} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title="Personal data">
        {isEditing ? (
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('name', {initialValue: user.name})(<Input />)}
            </Form.Item>
            <Form.Item label="Email">
              {getFieldDecorator('email', {initialValue: user.email})(<Input />)}
            </Form.Item>
            <Button onClick={() => this.setState({isEditing: false})}>Cancel</Button>{' '}
            <Button loading={isLoading} type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
        ) : (
          <Fragment>
            <dl>
              <dt>Name</dt>
              <dd>{user.name}</dd>
              {user.email && (
                <Fragment>
                  <dt>Email</dt>
                  <dd>
                    {user.email} {!user.email_verified && '(unverified)'}
                  </dd>
                </Fragment>
              )}
              <dt>Phone number</dt>
              <dd>{user.phone_number}</dd>
              <dt>Wallet address</dt>
              <dd>{user['custom:eth_address']}</dd>
              {user['custom:iban'] && (
                <Fragment>
                  <dt>IBAN</dt>
                  <dd>{user['custom:iban']}</dd>
                </Fragment>
              )}
            </dl>
            <Button type="primary" onClick={() => this.setState({isEditing: true})}>
              Edit
            </Button>
          </Fragment>
        )}
      </Card>
    );
  }
}

export default Form.create()(PersonalData);
