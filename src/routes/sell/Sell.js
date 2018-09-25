import {Card, Row, Col, message} from 'antd';
import React, {Component} from 'react';
import SellCoinsForm from './SellCoinsForm';

class Sell extends Component {
  handleNewWithdrawal = async data => {
    try {
      await this.props.newWithdrawal(data);
      message.success(
        "Transfer was successful, you'll receive funds on your bank account within 24 hours"
      );
      return true;
    } catch (error) {
      message.error(error.graphQLErrors[0].message);
    }
  };

  render() {
    return (
      <Row>
        <Col span={13}>
          <Card title="Sell coins">
            <SellCoinsForm onFormSubmit={this.handleNewWithdrawal} />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Sell;
