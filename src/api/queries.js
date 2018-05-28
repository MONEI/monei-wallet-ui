import gql from 'graphql-tag';

export const UserQuery = gql`
  query GetUser {
    user {
      email
      address
      balance
      id
      username
    }
  }
`;
