import gql from 'graphql-tag';

export const UserQuery = gql`
  query GetUser {
    user {
      address
      balance
    }
  }
`;

export const TransactionsQuery = gql`
  query Transactions {
    outgoingTransactions {
      items {
        id
        from
        to
        amount
        status
        createdAt
        updatedAt
      }
    }
    incomingTransactions {
      items {
        id
        from
        to
        amount
        status
        createdAt
        updatedAt
      }
    }
  }
`;
