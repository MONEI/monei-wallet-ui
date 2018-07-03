import produce from 'immer';
import {TransactionsQuery, UserQuery} from './queries';

/**
 * Creates transaction in apollo cache
 * @param client - apollo client
 * @param data - transaction
 */
export const createLocalTransaction = (client, data) => {
  const transaction = {__typename: 'Transaction', toInfo: '', ...data};
  try {
    const transactionsData = client.readQuery({query: TransactionsQuery, variables: {from: 0}});
    client.writeQuery({
      query: TransactionsQuery,
      variables: {from: 0},
      data: produce(transactionsData, draft => {
        draft.transactions.items = [transaction, ...draft.transactions.items];
      })
    });
  } catch (_) {}
};

/**
 * Updates transaction and user balance in apollo cache,
 * @param client - apollo client
 * @param data - transaction
 */
export const updateLocalTransaction = (client, data) => {
  const transaction = {__typename: 'Transaction', toInfo: '', ...data};
  try {
    const transactionsData = client.readQuery({query: TransactionsQuery, variables: {from: 0}});
    client.writeQuery({
      query: TransactionsQuery,
      variables: {from: 0},
      data: produce(transactionsData, draft => {
        draft.transactions.items = draft.transactions.items || [];
        const item = draft.transactions.items.find(trx => trx.id === transaction.id);
        if (item) {
          Object.assign(item, transaction);
        } else {
          draft.transactions.items.unshift(transaction);
        }
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
