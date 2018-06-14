import gql from 'graphql-tag';

export const UserQuery = gql`
  query GetUserData {
    user {
      address
      email
      phoneNumber
      balance
    }
  }
`;

export const TransactionsQuery = gql`
  query GetTransactions {
    transactions {
      id
      from
      to
      amount
      status
      createdAt
      updatedAt
      income
    }
  }
`;
