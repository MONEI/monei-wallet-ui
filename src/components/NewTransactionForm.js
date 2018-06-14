import React, {Component} from 'react';
import {Form, Input, InputNumber, Button, Row, Col, Modal} from 'antd';
import './NewTransactionForm.css';

const confirm = Modal.confirm;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NewTransactionForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const {form, onFormSubmit} = this.props;
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
          return onFormSubmit({
            amount: values.amount * 100,
            to: values.to
          }).then(() => form.resetFields());
        },
        onCancel() {}
      });
    });
  };

  render() {
    const {getFieldDecorator, getFieldsError} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="new-transaction-form">
        <Form.Item labelCol={{span: 5}} wrapperCol={{span: 19}} label="Address">
          {getFieldDecorator('to', {
            rules: [{required: true}]
          })(<Input size="large" />)}
        </Form.Item>
        <Form.Item labelCol={{span: 5}} wrapperCol={{span: 19}} label="Amount">
          {getFieldDecorator('amount', {
            rules: [{required: true}]
          })(<InputNumber size="large" style={{width: '100%'}} />)}
        </Form.Item>
        <Form.Item wrapperCol={{span: 19, offset: 5}}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            style={{width: '100%'}}>
            Transfer
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(NewTransactionForm);
