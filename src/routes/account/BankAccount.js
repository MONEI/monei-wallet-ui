import {Button, Card, Form, Input} from 'antd';
import {compact} from 'lib/utils';
import React, {Component, Fragment} from 'react';

class BankAccount extends Component {
  render() {
    return (
      <Card title="Bank Account">
        <Button type="primary">Attach bank account</Button>
      </Card>
    );
  }
}

export default BankAccount;
