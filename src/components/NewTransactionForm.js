import React, {Component} from 'react';
import {Form, Input, InputNumber, Button, Modal} from 'antd';
import './NewTransactionForm.css';

const {TextArea} = Input;
const {confirm} = Modal;

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
            ...values,
            amount: values.amount * 100
          }).then(() => form.resetFields());
        },
        onCancel() {}
      });
    });
  };

  render() {
    const {getFieldProps, getFieldsError} = this.props.form;
    const requiredField = name =>
      getFieldProps(name, {rules: [{required: true, message: 'this field is required'}]});
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal" className="new-transaction-form">
        <Form.Item labelCol={{span: 5}} wrapperCol={{span: 19}} label="Address">
          <Input {...getFieldProps('ethAddress')} size="large" />
        </Form.Item>
        <Form.Item labelCol={{span: 5}} wrapperCol={{span: 19}} label="Phone number">
          <Input {...getFieldProps('phoneNumber')} size="large" />
        </Form.Item>
        <Form.Item labelCol={{span: 5}} wrapperCol={{span: 19}} label="Email">
          <Input {...getFieldProps('email')} size="large" />
        </Form.Item>
        <Form.Item labelCol={{span: 5}} wrapperCol={{span: 19}} label="Amount">
          <InputNumber {...requiredField('amount')} size="large" style={{width: '100%'}} />
        </Form.Item>
        <Form.Item labelCol={{span: 5}} wrapperCol={{span: 19}} label="Note">
          <TextArea {...getFieldProps('note')} size="large" autosize />
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
