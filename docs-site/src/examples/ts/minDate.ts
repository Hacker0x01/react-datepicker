const minDateTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      minDate={subDays(new Date(), 5)}
      placeholderText="Select a date after 5 days ago"
    />
  );
};

render(<Example />);
`;

export default minDateTS;
