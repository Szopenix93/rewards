import { render, screen } from "@testing-library/react";
import Header from "../components/header/Header";

test('should display tittle', () => {
  render(<Header />);

  const element = screen.getByText('Rewards for each customer');

  expect(element).toBeInTheDocument();
});