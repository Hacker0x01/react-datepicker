() => {
  const [selectedDate, setSelectedDate] = useState(new Date("2024-08-01"));
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="MM/yyyy"
      excludeDates={[new Date("2024-05-01"), new Date("2024-06-01")]}
      showMonthYearPicker
    />
  );
};
