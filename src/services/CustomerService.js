import transactions from '../data/transactions.json';

const DELAY = 2000;
const ERR_MESSAGE = "Exception occurred while fetching transactions";
const IS_RESOLVED = true;

export async function getTransactions() {
  return new Promise((resolve, reject) => {
    if (IS_RESOLVED) {
      setTimeout(() => resolve(transactions), DELAY);
    } else {
      setTimeout(() => reject(new Error(ERR_MESSAGE)), DELAY);
    }
  });
}

