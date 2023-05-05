import { render, screen } from "@testing-library/react";
import RewardsTable from "../components/rewards/RewardsTable";

jest.mock("../services/CustomerService");

/*jest.mock('../services/CustomerService', () => ({
  getTransactions: jest.fn().mockReturnValue(Promise.resolve(['Test']))
}));*/

test('should fetch and display asynchronous rewards for customers', async () => {
  render(<RewardsTable />);

  expect(await screen.findByText('Total')).toBeVisible();

});