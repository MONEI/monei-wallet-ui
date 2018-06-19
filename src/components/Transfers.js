import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {NewTransactionMutation} from '../api/mutations';
import {createLocalTransaction} from '../api/utils';
import NewTransactionForm from './NewTransactionForm';
import {message} from 'antd/lib';
import {Card} from 'antd';

class Transfers extends Component {
  handleNewTransaction = async data => {
    try {
      await this.props.newTransaction(data);
      message.success('Transfer was successful');
      return true;
    } catch (error) {
      message.error(error.graphQLErrors[0].message);
    }
  };

  render() {
    return (
      <div className="transfers">
        <Card title="New transfer" style={{maxWidth: 550}}>
          <NewTransactionForm onFormSubmit={this.handleNewTransaction} />
        </Card>
      </div>
    );
  }
}

export default graphql(NewTransactionMutation, {
  props: ({mutate}) => ({
    newTransaction: data => {
      return mutate({
        variables: data,
        update: (client, {data: {newTransaction}}) => {
          createLocalTransaction(client, newTransaction);
        }
      });
    }
  })
})(Transfers);
