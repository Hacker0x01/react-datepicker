const maxDateTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      maxDate={addDays(new Date(), 5)}
      placeholderText="Select a date before 5 days in the future"
    />
  );
};

render(<Example />);
`;

export default maxDateTS;
