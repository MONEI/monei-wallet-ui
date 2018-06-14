import produce from 'immer';
import {TransactionsQuery, UserQuery} from './queries';

/**
 * Creates transaction in apollo cache
 * @param client - apollo client
 * @param transaction
 */
export const createLocalTransaction = (client, transaction) => {
  const transactionsData = client.readQuery({query: TransactionsQuery});
  client.writeQuery({
    query: TransactionsQuery,
    data: produce(transactionsData, draft => {
      draft.transactions.unshift(transaction);
    })
  });
};

/**
 * Updates transaction and user balance in apollo cache,
 * @param client - apollo client
 * @param transaction
 */
export const updateLocalTransaction = (client, transaction) => {
  const transactionsData = client.readQuery({query: TransactionsQuery});
  const userData = client.readQuery({query: UserQuery});
  client.writeQuery({
    query: TransactionsQuery,
    data: produce(transactionsData, draft => {
      Object.assign(draft.transactions.find(trx => trx.id === transaction.id), transaction);
    })
  });
  client.writeQuery({
    query: UserQuery,
    data: produce(userData, draft => {
      if (transaction.income) {
        draft.user.balance += transaction.amount;
      } else {
        draft.user.balance -= transaction.amount;
      }
    })
  });
};
