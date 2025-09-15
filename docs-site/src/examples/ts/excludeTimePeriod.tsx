const { setHours, setMinutes } = DateFNS;

const ExcludeTimePeriod = () => {
  const [selectedDate, setSelectedDateTime] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 17),
  );

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDateTime(date)}
      showTimeSelect
      minTime={setHours(setMinutes(new Date(), 0), 17)}
      maxTime={setHours(setMinutes(new Date(), 30), 20)}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

render(ExcludeTimePeriod);
