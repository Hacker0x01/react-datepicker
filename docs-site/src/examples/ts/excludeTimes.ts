const excludeTimesTS = `
type TExcludeTimes = Date[];

const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 16),
  );

  const excludeTimes: TExcludeTimes = [
    setHours(setMinutes(new Date(), 0), 17),
    setHours(setMinutes(new Date(), 30), 18),
    setHours(setMinutes(new Date(), 30), 19),
    setHours(setMinutes(new Date(), 30), 17),
  ]

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showTimeSelect
      excludeTimes={excludeTimes}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

render(<Example />);
`;

export default excludeTimesTS;
