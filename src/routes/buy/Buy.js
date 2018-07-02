import React from 'react';
import {Card, Button} from 'antd';

const Buy = ({prepareCheckout}) => {
  return (
    <div>
      <Card title="Buy coins" style={{maxWidth: 550}}>
        <Button onClick={() => prepareCheckout({amount: 1000})}>Buy 10 EURM</Button>
      </Card>
    </div>
  );
};

export default Buy;
