type TIncludeDateIntervals = {
  start: Date;
  end: Date;
}[];

const IncludeDateIntervals = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const includeDateIntervals: TIncludeDateIntervals = [
    { start: subDays(new Date(), 5), end: addDays(new Date(), 5) },
  ];

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      includeDateIntervals={includeDateIntervals}
      placeholderText="This only includes dates from 5 days ago to 5 days in the future"
    />
  );
};

render(IncludeDateIntervals);
