import {MONTH_NAMES} from "../helper/Constants";

export function sortArrayByMonthName(arr) {
  arr.sort(function(a, b){
    return MONTH_NAMES.indexOf(a) - MONTH_NAMES.indexOf(b);
  });
}