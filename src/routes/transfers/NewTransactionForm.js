import {Button, Form, Icon, Input, InputNumber, Modal, Select} from 'antd';
import {isValidNumber} from 'libphonenumber-js/custom';
import metadata from 'libphonenumber-js/metadata.min.json';
import utils from 'web3-utils';
import React, {Component} from 'react';

const {TextArea} = Input;
const {confirm} = Modal;
const {Option} = Select;

const RECIPIENT_FIELDS = {
  phoneNumber: {
    name: 'Phone number',
    placeholder: '+14325551212',
    options: {
      validateTrigger: 'onBlur',
      rules: [
        {
          required: true,
          message: 'please input a valid phone number!',
          validator(rule, value, cb) {
            isValidNumber(value, metadata) ? cb() : cb(true);
          }
        }
      ]
    }
  },
  email: {
    name: 'Email',
    placeholder: 'email@example.com',
    options: {
      validateTrigger: 'onBlur',
      rules: [{required: true, message: 'please input a valid email', type: 'email'}]
    }
  },
  ethAddress: {
    name: 'Wallet address',
    placeholder: '0x1d0c461935E3827b30D125A53543b95ABc21efe8',
    options: {
      validateTrigger: 'onBlur',
      rules: [
        {
          required: true,
          message: 'please input a valid wallet address',
          validator(rule, value, cb) {
            utils.isAddress(value) ? cb() : cb(true);
          }
        }
      ]
    }
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
          }).then(reset => reset && form.resetFields());
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
            {...getFieldProps(this.state.recipientField, selectedField.options)}
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
            <Icon type="export" />
            Transfer
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(NewTransactionForm);
