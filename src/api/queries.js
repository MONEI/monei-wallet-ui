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
  query GetTransactions($from: Int, $size: Int) {
    transactions(from: $from, size: $size) {
      items {
        id
        from
        to
        amount
        status
        createdAt
        updatedAt
        fromInfo
        toInfo
        note
        income
      }
      total
    }
  }
`;
