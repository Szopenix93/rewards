import transactions from '../data/transactions.json';
import {DELAY, ERR_MESSAGE, IS_RESOLVED} from "../helper/Constants";

export async function getTransactions() {
  return new Promise((resolve, reject) => {
    if (IS_RESOLVED) {
      setTimeout(() => resolve(transactions), DELAY);
    } else {
      setTimeout(() => reject(new Error(ERR_MESSAGE)), DELAY);
    }
  });
}

