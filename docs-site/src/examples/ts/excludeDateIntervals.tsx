type TExcludeDateIntervals = {
  start: Date;
  end: Date;
}[];

const ExcludeDateIntervals = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const excludeDateIntervals: TExcludeDateIntervals = [
    {
      start: DateFNS.subDays(new Date(), 5),
      end: DateFNS.addDays(new Date(), 5),
    },
  ];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      excludeDateIntervals={excludeDateIntervals}
      placeholderText="Select a date other than the interval from 5 days ago to 5 days in the future"
    />
  );
};

render(ExcludeDateIntervals);
