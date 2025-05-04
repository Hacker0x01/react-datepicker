const WeekNumbersTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      locale="en-GB"
      showWeekNumbers
    />
  );
};

render(<Example />);
`;

export default WeekNumbersTS;
