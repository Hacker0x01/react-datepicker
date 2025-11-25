const { setHours, setMinutes } = DateFNS;

const ExcludeTimePeriod = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 17),
  );

  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={setSelectedDateTime}
      showTimeSelect
      minTime={setHours(setMinutes(new Date(), 0), 17)}
      maxTime={setHours(setMinutes(new Date(), 30), 20)}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

render(ExcludeTimePeriod);
