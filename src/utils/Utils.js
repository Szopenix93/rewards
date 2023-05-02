import { Months } from "../enums/Months";

export function sortArrayByMonthName(arr) {
  arr.sort((a, b) => Months[a] - Months[b]);
}