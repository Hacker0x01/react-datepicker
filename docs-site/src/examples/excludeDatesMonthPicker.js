() => {
  const [startDate, setStartDate] = useState(new Date("2024-08-01"));
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="MM/yyyy"
      excludeDates={[new Date("2024-05-01"), new Date("2024-06-01")]}
      showMonthYearPicker
    />
  );
};
