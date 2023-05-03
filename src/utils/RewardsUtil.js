import { Months } from "../enums/Months";

export function transformTransactions(transactions) {
  const monthsSet = new Set();
  const customerNamesMap = new Map();

  const customersMap = calculateAmountForEachMonth(transactions, monthsSet, customerNamesMap);

  const customersUiArr = [];
  populateCustomersUiArr(customersMap, customerNamesMap, customersUiArr);

  const monthsUiArr = Array.from(monthsSet);
  sortArrayByMonthName(monthsUiArr);

  return { customersArr: customersUiArr, monthsArr: monthsUiArr };
}

function calculateAmountForEachMonth(transactions, monthsSet, customerNamesMap) {
  return transactions.reduce((customersMap, item) => {
    const { customerId, customerName, date, amount } = item;
    const monthNumber = +date.split('-')[1];
    const month = Object.keys(Months).find(key => Months[key] === monthNumber);

    if (!monthsSet.has(month)) {
      monthsSet.add(month);
    }
    const points = calculatePoints(amount);

    if (!customersMap.has(customerId)) {
      customerNamesMap.set(customerId, customerName);
      const monthsMap = new Map();

      monthsMap.set(month, points);
      customersMap.set(customerId, monthsMap);
    } else {
      const monthsMap = customersMap.get(customerId);
      const prevPoints = monthsMap.get(month);
      const sum = (prevPoints ?? 0) + points;

      monthsMap.set(month, sum);
    }

    return customersMap;
  }, new Map());
}

function calculatePoints(amount) {
  if (amount > 100) { //100 is level where we get 2 points per 1$
    return 50 + 2 * (amount - 100);
  } else if (amount > 50) { //50 is level where we get 1 point per 1$
    return amount - 50;
  }
  return 0;
}

function populateCustomersUiArr(customersMap, customerNamesMap, customersUiArr) {
  customersMap.forEach((monthsMap, customerId) => {
    const customerName = customerNamesMap.get(customerId);
    const row = { customerId, customerName };
    let total = 0;
    monthsMap.forEach((points, month) => {
      row[month] = points;
      total += points;
    });
    Object.assign(row, { total });

    customersUiArr.push(row);
  });
}

function sortArrayByMonthName(arr) {
  arr.sort((a, b) => Months[a] - Months[b]);
}