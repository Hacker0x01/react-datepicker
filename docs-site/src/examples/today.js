() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      todayButton="Vandaag"
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
  );
};
