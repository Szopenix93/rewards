import transactions from '../../data/transactions.json';

export async function getTransactions() {
  return new Promise((resolve) => {
      setTimeout(() => resolve(transactions), 500);
  });
}