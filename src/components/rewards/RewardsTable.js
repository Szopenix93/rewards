import { useEffect, useMemo, useState } from "react";
import { getTransactions } from "../../services/CustomerService";
import RewardsRow from "./reward/RewardsRow";
import { transformTransactions } from "../../utils/RewardsUtil";
import classes from './RewardsTable.module.css';
import { Spinner } from "../ui/Spinner";

const RewardsTable = () => {
  const [customers, setCustomers] = useState([]);
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      const transactions = await getTransactions();

      if (!ignore) {
        const { customersArr, monthsArr } = transformTransactions(transactions);
        setMonths(monthsArr);
        setCustomers(customersArr);
        setLoading(false);
      }
    }

    let ignore = false;
    void fetchTransactions();

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

  if (loading) return <Spinner/>;

  return (
    <table className={classes.center}>
      <thead>
        <tr>
          <th className={classes['col-name']}>Customer</th>
          {months.map(month => <th className={classes['col-month']} key={month}>{month}</th>)}
          <th className={classes['col-month']}>Total</th>
        </tr>
      </thead>
      <tbody>
        {transformedCustomers}
      </tbody>
    </table>
  );
};

export default RewardsTable;