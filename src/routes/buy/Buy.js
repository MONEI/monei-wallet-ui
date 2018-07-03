import {Card} from 'antd';
import React from 'react';
import BuyCoinsForm from './BuyCoinsForm';

const Buy = ({prepareCheckout}) => {
  return (
    <div>
      <Card title="Buy coins" style={{maxWidth: 550}}>
        <BuyCoinsForm onFormSubmit={prepareCheckout} />
      </Card>
    </div>
  );
};

export default Buy;
