import {Button, Card, Form, Input} from 'antd';
import React, {Component, Fragment} from 'react';
import {graphql} from 'react-apollo';
import {AttachBankAccount} from 'api/mutations';

class BankAccount extends Component {
  state = {
    isLoading: false,
    isEditing: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const {form} = this.props;
    form.validateFields((err, data) => {
      if (err) return;
      this.props.attachBankAccount(data);
    });
  };

  render() {
    const {isLoading, isEditing} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title="Bank Account">
        {isEditing ? (
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <Form.Item label="Account holder name">
              {getFieldDecorator('accountHolderName')(<Input />)}
            </Form.Item>
            <Form.Item label="Country">{getFieldDecorator('country')(<Input />)}</Form.Item>
            <Form.Item label="IBAN">{getFieldDecorator('IBAN')(<Input />)}</Form.Item>
            <Button onClick={() => this.setState({isEditing: false})}>Cancel</Button>{' '}
            <Button loading={isLoading} type="primary" htmlType="submit">
              Attach
            </Button>
          </Form>
        ) : (
          <Fragment>
            <Button type="primary" onClick={() => this.setState({isEditing: true})}>
              Attach bank account
            </Button>
          </Fragment>
        )}
      </Card>
    );
  }
}

const BankAccountForm = Form.create()(BankAccount);

export default graphql(AttachBankAccount, {
  props: ({mutate}) => ({
    attachBankAccount: data => {
      console.log(data);
      return mutate({
        variables: data
      });
    }
  })
})(BankAccountForm);
