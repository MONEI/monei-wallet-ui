import React, {Component} from 'react';
import {Form, Input, InputNumber, Button, Modal, Select} from 'antd';

const {TextArea} = Input;
const {confirm} = Modal;
const {Option} = Select;

const RECIPIENT_FIELDS = {
  phoneNumber: {
    name: 'Phone number',
    placeholder: '+14325551212'
  },
  email: {
    name: 'Email',
    placeholder: 'email@example.com'
  },
  ethAddress: {
    name: 'Address',
    placeholder: '0x1d0c461935E3827b30D125A53543b95ABc21efe8'
  }
};

class NewTransactionForm extends Component {
  state = {
    recipientField: 'phoneNumber'
  };

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
    const {getFieldProps} = this.props.form;
    const selectedField = RECIPIENT_FIELDS[this.state.recipientField];
    const requiredField = name =>
      getFieldProps(name, {rules: [{required: true, message: 'this field is required'}]});
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal" className="new-transaction-form">
        <Form.Item labelCol={{span: 6}} wrapperCol={{span: 18}} label="Send by">
          <Select
            onChange={recipientField => this.setState({recipientField})}
            value={this.state.recipientField}>
            {Object.keys(RECIPIENT_FIELDS).map(key => (
              <Option key={key} value={key}>
                {RECIPIENT_FIELDS[key].name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item labelCol={{span: 6}} wrapperCol={{span: 18}} label={selectedField.name}>
          <Input
            {...requiredField(this.state.recipientField)}
            placeholder={selectedField.placeholder}
          />
        </Form.Item>
        <Form.Item labelCol={{span: 6}} wrapperCol={{span: 18}} label="Amount">
          <InputNumber {...requiredField('amount')} style={{width: '100%'}} precision={2} />
        </Form.Item>
        <Form.Item labelCol={{span: 6}} wrapperCol={{span: 18}} label="Note">
          <TextArea {...getFieldProps('note')} autosize />
        </Form.Item>
        <Form.Item wrapperCol={{span: 18, offset: 6}}>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            Transfer
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(NewTransactionForm);
