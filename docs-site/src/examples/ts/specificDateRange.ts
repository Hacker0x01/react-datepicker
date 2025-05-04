const specificDateRangeTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      minDate={new Date()}
      maxDate={addDays(new Date(), 5)}
      placeholderText="Select a date between today and 5 days in the future"
    />
  );
};

render(<Example />);
`;

export default specificDateRangeTS;
