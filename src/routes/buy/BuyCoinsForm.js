import React, {Component} from 'react';
import {Form, InputNumber, Button, Icon} from 'antd';

const ButtonGroup = Button.Group;

class BuyCoinsForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const {form, onFormSubmit} = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      onFormSubmit({amount: values.amount * 100});
    });
  };

  render() {
    const {getFieldProps} = this.props.form;
    const requiredField = name =>
      getFieldProps(name, {rules: [{required: true, message: 'this field is required'}]});
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal" className="new-transaction-form">
        <Form.Item labelCol={{span: 6}} wrapperCol={{span: 18}} label="Buy">
          <ButtonGroup>
            {[10, 50, 100, 500].map((amount, i) => (
              <Button onClick={() => this.props.onFormSubmit({amount: amount * 100})}>
                {amount} EURM
              </Button>
            ))}
          </ButtonGroup>
        </Form.Item>
        <Form.Item labelCol={{span: 6}} wrapperCol={{span: 18}} label="Amount">
          <InputNumber {...requiredField('amount')} style={{width: '100%'}} precision={2} />
        </Form.Item>
        <Form.Item wrapperCol={{span: 18, offset: 6}}>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            <Icon type="credit-card" />
            Buy
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(BuyCoinsForm);
