const excludeDateIntervalsTS = `
type TExcludeDateIntervals = {
  start: Date;
  end: Date;
}[];

const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const excludeDateIntervals: TExcludeDateIntervals = [
    {
      start: subDays(new Date(), 5),
      end: addDays(new Date(), 5)
    },
  ]

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      excludeDateIntervals={excludeDateIntervals}
      placeholderText="Select a date other than the interval from 5 days ago to 5 days in the future"
    />
  );
};

render(<Example />);
`;

export default excludeDateIntervalsTS;
