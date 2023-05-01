import {useEffect, useMemo, useState} from "react";
import {getTransactions} from "../../services/CustomerService";
import RewardsRow from "./reward/RewardsRow";
import {transformTransactions} from "../../utils/RewardsUtil";
import classes from './RewardsTable.module.css';
import {ERR_MESSAGE} from "../../helper/Constants";

const RewardsTable = () => {
  const [customers, setCustomers] = useState([]);
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchTransactions() {
      if (!ignore) {
        try {
          const transactions = await getTransactions();
          const {customersArr, monthsArr} = transformTransactions(transactions);

          setMonths(monthsArr);
          setCustomers(customersArr);
        } catch (e) {
          setHasError(true);
        } finally {
          setLoading(false);
        }
      }
    }

    let ignore = false;
    fetchTransactions();

    return () => {
      ignore = true;
    }
  }, [])

  //without useMemo if we have other state / props, below calculations would recalculate with every state / props change 
  const transformedCustomers = useMemo(() => {
    return customers.map(customer => {
      const [firstMonth, secondMonth, thirdMonth] = [customer[months[0]], customer[months[1]], customer[months[2]]];

      return (<RewardsRow key={customer.customerId}
                          customerName={customer.customerName}
                          firstMonth={firstMonth}
                          secondMonth={secondMonth}
                          thirdMonth={thirdMonth}
                          total={customer.total}/>);
    });
  }, [customers, months]);

  if (loading) return <p>Loading...</p>;
  if (hasError) return <p>{ERR_MESSAGE}</p>;

  return (
    <table className={classes.center}>
      <colgroup>
        <col className={classes['col-name']}/>
        <col className={classes['col-month']}/>
        <col className={classes['col-month']}/>
        <col className={classes['col-month']}/>
        <col className={classes['col-month']}/>
      </colgroup>
      <thead>
        <tr>
          <th>Customer</th>
          {months.map(month => <th key={month}>{month}</th>)}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
      {transformedCustomers}
      </tbody>
    </table>
  );
};

export default RewardsTable;