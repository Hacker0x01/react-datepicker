const fixedCalendarTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      fixedHeight
    />
  );
};

render(<Example />);
`;

export default fixedCalendarTS;
