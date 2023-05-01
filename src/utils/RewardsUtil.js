import {sortArrayByMonthName} from "./Utils";

export function transformTransactions(transactions) {
  const monthsSet = new Set();
  const customerNamesMap = new Map();

  const customersMap = calculateAmountForEachMonth(transactions, monthsSet, customerNamesMap);

  const customersUiArr = [];
  populateCustomersUiArr(customersMap, customerNamesMap, customersUiArr);

  const monthsUiArr = Array.from(monthsSet);
  sortArrayByMonthName(monthsUiArr);

  return {customersArr: customersUiArr, monthsArr: monthsUiArr};
}

function calculateAmountForEachMonth(transactions, monthsSet, customerNamesMap) {
  return transactions.reduce((customersMap, item) => {
    const {customerId, customerName, date, amount} = item;
    //alternatively we could just split date by '-', get 2nd item and create MONTHS constant in Constants.js
    const month = new Date(date).toLocaleString('en-US', {month: 'long'});
    if (!monthsSet.has(month)) {
      monthsSet.add(month);
    }

    let points = 0;
    points = calculatePoints(amount, points);

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

function calculatePoints(amount, points) {
  if (amount >= 100) {
    points = 50 + 2 * (amount - 100);
  } else if (amount >= 50) {
    points = amount - 50;
  }
  return points;
}

function populateCustomersUiArr(customersMap, customerNamesMap, customersUiArr) {
  customersMap.forEach((monthsMap, customerId) => {
    const customerName = customerNamesMap.get(customerId);
    const row = {customerId, customerName};
    let total = 0;
    monthsMap.forEach((points, month) => {
      row[month] = points;
      total += points;
    });
    Object.assign(row, {total});

    customersUiArr.push(row);
  });
}