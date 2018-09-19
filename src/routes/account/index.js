import {Col, Row} from 'antd';
import React from 'react';
import BankAccount from './BankAccount';
import PersonalData from './PersonalData';

const Account = props => (
  <Row gutter={30}>
    <Col span={12}>
      <PersonalData {...props} />
    </Col>
    <Col span={12}>
      <BankAccount />
    </Col>
  </Row>
);

export default Account;
