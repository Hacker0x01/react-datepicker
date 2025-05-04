const tabIndexTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={setStartDate}
      tabIndex={1}
    />
  );
};

render(<Example />);
`;

export default tabIndexTS;
