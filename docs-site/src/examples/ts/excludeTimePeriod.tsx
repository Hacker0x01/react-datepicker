const { setHours, setMinutes } = DateFNS;

const ExcludeTimePeriod = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 17),
  );

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showTimeSelect
      minTime={setHours(setMinutes(new Date(), 0), 17)}
      maxTime={setHours(setMinutes(new Date(), 30), 20)}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

render(ExcludeTimePeriod);
