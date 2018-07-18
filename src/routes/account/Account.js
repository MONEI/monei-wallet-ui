import React from 'react';
import {Card} from 'antd';

const Account = ({user}) => {
  return (
    <div>
      <Card title="Personal data" style={{maxWidth: 550}}>
        <dl>
          <dt>Name</dt>
          <dd>{user.name}</dd>
          <dt>Phone number</dt>
          <dd>{user.phoneNumber}</dd>
          <dt>Wallet address</dt>
          <dd>{user.address}</dd>
        </dl>
      </Card>
    </div>
  );
};

export default Account;
