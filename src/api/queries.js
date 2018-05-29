import gql from 'graphql-tag';

export const UserDataQuery = gql`
  query GetUserData {
    user {
      address
      balance
      username
    }
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
