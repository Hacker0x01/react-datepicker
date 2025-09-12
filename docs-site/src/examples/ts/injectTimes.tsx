const { setHours, setMinutes, setSeconds } = DateFNS;

const InjectTimes = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 16),
  );

  const injectTimes: Date[] = [
    setHours(setMinutes(setSeconds(new Date(), 10), 1), 0),
    setHours(setMinutes(new Date(), 5), 12),
    setHours(setMinutes(new Date(), 59), 23),
  ];

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showTimeSelect
      timeFormat="HH:mm:ss"
      injectTimes={injectTimes}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

render(InjectTimes);
