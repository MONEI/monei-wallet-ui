import {Card, Row, Col} from 'antd';
import React from 'react';
import BuyCoinsForm from './BuyCoinsForm';

const Buy = ({prepareCheckout}) => {
  return (
    <Row>
      <Col span={13}>
        <Card title="Buy coins">
          <BuyCoinsForm onFormSubmit={prepareCheckout} />
        </Card>
      </Col>
    </Row>
  );
};

export default Buy;
