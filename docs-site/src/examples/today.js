() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      todayButton="Vandaag"
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  );
};
