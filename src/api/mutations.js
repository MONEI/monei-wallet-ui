import gql from 'graphql-tag';

export const NewTransactionMutation = gql`
  mutation NewTransactionMutation(
    $amount: Int!
    $ethAddress: String
    $phoneNumber: String
    $email: String
    $note: String
  ) {
    newTransaction(
      amount: $amount
      ethAddress: $ethAddress
      phoneNumber: $phoneNumber
      email: $email
      note: $note
    ) {
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
  }
`;

export const NewWithdrawalMutation = gql`
  mutation NewWithdrawalMutation($amount: Int!) {
    newWithdrawal(amount: $amount) {
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
  }
`;

export const PrepareCheckoutMutation = gql`
  mutation PrepareCheckoutMutation($amount: Int!) {
    prepareCheckout(amount: $amount) {
      checkoutUrl
    }
  }
`;

export const AttachBankAccount = gql`
  mutation AttachBankAccount($accountHolderName: String!, $IBAN: String!) {
    attachBankAccount(accountHolderName: $accountHolderName, IBAN: $IBAN) {
      id
      accountHolderName
      country
      IBAN
    }
  }
`;

export const DetachBankAccount = gql`
  mutation DetachBankAccount {
    detachBankAccount {
      success
    }
  }
`;
