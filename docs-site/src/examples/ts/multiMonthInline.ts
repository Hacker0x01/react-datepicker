const multiMonthInlineTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      monthsShown={2}
      inline
    />
  );
};

render(<Example />);
`;

export default multiMonthInlineTS;
