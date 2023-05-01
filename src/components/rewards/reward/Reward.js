const Reward = ({customerName, firstMonth, secondMonth, thirdMonth, total}) => {
  return (
    <tr>
      <td>{customerName}</td>
      <td>{firstMonth}</td>
      <td>{secondMonth}</td>
      <td>{thirdMonth}</td>
      <td>{total}</td>
    </tr>
  );
};

export default Reward;