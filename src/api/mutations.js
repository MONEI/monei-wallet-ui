import gql from 'graphql-tag';

export const NewTransactionMutation = gql`
  mutation NewTransactionMutation($amount: Int!, $to: String!) {
    newTransaction(amount: $amount, to: $to) {
      id
      from
      to
      amount
      status
      createdAt
      updatedAt
    }
  }
`;
