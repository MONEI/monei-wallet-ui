import produce from 'immer';
import {TransactionsQuery, UserQuery} from './queries';

/**
 * Creates transaction in apollo cache
 * @param client - apollo client
 * @param transaction
 */
export const createLocalTransaction = (client, transaction) => {
  try {
    const transactionsData = client.readQuery({query: TransactionsQuery, variables: {from: 0}});
    client.writeQuery({
      query: TransactionsQuery,
      variables: {from: 0},
      data: produce(transactionsData, draft => {
        draft.transactions.items.unshift(transaction);
      })
    });
  } catch (_) {}
};

/**
 * Updates transaction and user balance in apollo cache,
 * @param client - apollo client
 * @param transaction
 */
export const updateLocalTransaction = (client, transaction) => {
  try {
    const transactionsData = client.readQuery({query: TransactionsQuery, variables: {from: 0}});
    client.writeQuery({
      query: TransactionsQuery,
      variables: {from: 0},
      data: produce(transactionsData, draft => {
        const item = draft.transactions.items.find(trx => trx.id === transaction.id);
        if (item) Object.assign(item, transaction);
      })
    });
  } catch (_) {}
  const userData = client.readQuery({query: UserQuery});
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
