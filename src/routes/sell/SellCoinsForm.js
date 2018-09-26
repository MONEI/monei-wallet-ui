import {Button, Form, Icon, InputNumber, Modal} from 'antd';
import React, {Component} from 'react';

const {confirm} = Modal;

class SellCoinsForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const {form, onFormSubmit} = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      confirm({
        title: 'Are you sure?',
        content: (
          <span>
            Please confirm that you want to withdraw <strong>{values.amount}</strong> EURM
          </span>
        ),
        okText: 'Confirm',
        onOk() {
          return onFormSubmit({
            amount: values.amount * 100
          }).then(reset => reset && form.resetFields());
        },
        onCancel() {}
      });
    });
  };

  render() {
    const {getFieldProps} = this.props.form;
    const requiredField = name =>
      getFieldProps(name, {rules: [{required: true, message: 'this field is required'}]});
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal" className="new-transaction-form">
        <Form.Item labelCol={{span: 6}} wrapperCol={{span: 18}} label="Amount">
          <InputNumber {...requiredField('amount')} style={{width: '100%'}} precision={2} />
        </Form.Item>
        <Form.Item wrapperCol={{span: 18, offset: 6}}>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            <Icon type="euro" />
            Sell
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(SellCoinsForm);
