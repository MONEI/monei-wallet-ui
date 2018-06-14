import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {NewTransactionMutation} from '../api/mutations';
import {createLocalTransaction} from '../api/utils';
import NewTransactionForm from './NewTransactionForm';
import {message} from 'antd/lib';

class Transfers extends Component {
  handleNewTransaction = data => {
    return this.props
      .newTransaction(data)
      .then(() => {
        message.success('Transfer was successful');
      })
      .catch(e => {
        message.error(e.graphQLErrors[0].message);
      });
  };

  render() {
    return (
      <div className="transfers">
        <NewTransactionForm onFormSubmit={this.handleNewTransaction} />
      </div>
    );
  }
}

export default graphql(NewTransactionMutation, {
  props: ({mutate}) => ({
    newTransaction: ({amount, to}) => {
      return mutate({
        variables: {amount, to},
        update: (client, {data: {newTransaction}}) => {
          createLocalTransaction(client, newTransaction);
        }
      });
    }
  })
})(Transfers);
