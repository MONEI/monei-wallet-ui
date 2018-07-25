import gql from 'graphql-tag';

export const GetBalanceQuery = gql`
  query GetBalance {
    balance
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
