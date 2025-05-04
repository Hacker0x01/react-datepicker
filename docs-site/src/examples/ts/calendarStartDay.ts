const calendarStartDayTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      calendarStartDay={3}
    />
  );
};

render(<Example />);
`;

export default calendarStartDayTS;
