import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import produce from 'immer';
import {NewTransactionMutation} from '../api/mutations';
import {TransactionsQuery} from '../api/queries';
import {createLocalTransaction} from '../api/utils';
import {Form, Input, InputNumber, Button, Row, Col, Modal, message} from 'antd';
const confirm = Modal.confirm;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NewTransactionForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const {form, newTransaction} = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      confirm({
        title: 'Are you sure?',
        content: (
          <span>
            Please confirm that you want to send <strong>{values.amount}</strong> EURM
          </span>
        ),
        okText: 'Confirm',
        onOk() {
          return newTransaction({
            amount: values.amount * 100,
            to: values.to
          })
            .then(() => form.resetFields())
            .catch(e => {
              message.error(e.graphQLErrors[0].message);
            });
        },
        onCancel() {}
      });
    });
  };
  render() {
    const {getFieldDecorator, getFieldsError} = this.props.form;
    return (
      <div className="new-transaction-form">
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={15}>
            <Col span={14}>
              <Form.Item>
                {getFieldDecorator('to', {
                  rules: [{required: true}]
                })(<Input size="large" placeholder="Address" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                {getFieldDecorator('amount', {
                  rules: [{required: true}]
                })(<InputNumber size="large" placeholder="Amount" style={{width: '100%'}} />)}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                  style={{width: '100%'}}>
                  Send
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
const connectedForm = graphql(NewTransactionMutation, {
  props: ({mutate}) => ({
    newTransaction: ({amount, to}) => {
      return mutate({
        variables: {amount, to},
        update: (client, {data: {newTransaction}}) => {
          createLocalTransaction(client, newTransaction);
        }
      });
    }
  })
})(NewTransactionForm);

export default Form.create()(connectedForm);
