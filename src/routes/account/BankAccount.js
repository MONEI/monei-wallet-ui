import {Button, Card, Form, Input, Modal} from 'antd';
import {AttachBankAccount, DetachBankAccount} from 'api/mutations';
import {GetBankAccountQuery} from 'api/queries';
import React, {Component, Fragment} from 'react';
import {compose, graphql} from 'react-apollo';

const {confirm} = Modal;

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
      this.setState({isLoading: true});
      this.props.attachBankAccount(data).then(() => {
        this.setState({isLoading: false, isEditing: false});
      });
    });
  };

  detach = async () => {
    const {detachBankAccount} = this.props;
    confirm({
      title: 'Are you sure?',
      content: 'Please confirm that you want to detach your bank account',
      okText: 'Confirm',
      onOk: detachBankAccount,
      onCancel() {}
    });
  };

  render() {
    const {loading, bankAccount} = this.props.data;
    const {isLoading, isEditing} = this.state;
    const {getFieldDecorator} = this.props.form;
    if (loading) return null;
    if (bankAccount) {
      return (
        <Card title="Bank Account">
          <dl>
            <dt>Account holder name</dt>
            <dd>{bankAccount.accountHolderName}</dd>
            <dt>Country</dt>
            <dd>{bankAccount.country}</dd>
            <dt>IBAN</dt>
            <dd>{bankAccount.IBAN}</dd>
          </dl>
          <Button type="danger" loading={isLoading} onClick={this.detach}>
            Detach bank account
          </Button>
        </Card>
      );
    }
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

const withAttachMutation = graphql(AttachBankAccount, {
  props: ({mutate}) => ({
    attachBankAccount: variables => mutate({variables})
  }),
  options: {
    update: (proxy, {data: {attachBankAccount}}) => {
      proxy.writeQuery({
        query: GetBankAccountQuery,
        data: {bankAccount: {...attachBankAccount, __typename: 'bankAccount'}}
      });
    }
  }
});

const withDetachMutation = graphql(DetachBankAccount, {
  props: ({mutate}) => ({
    detachBankAccount: mutate
  }),
  options: {
    update: (proxy, {data: {detachBankAccount}}) => {
      if (detachBankAccount.success) {
        proxy.writeQuery({query: GetBankAccountQuery, data: {bankAccount: null}});
      }
    }
  }
});

export default compose(
  withAttachMutation,
  withDetachMutation,
  graphql(GetBankAccountQuery),
  Form.create()
)(BankAccount);
