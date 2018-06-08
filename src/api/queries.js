import gql from 'graphql-tag';

export const UserDataQuery = gql`
  query GetUserData {
    user {
      address
      email
      phoneNumber
      balance
    }
    transactions {
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
