() => {
  const defaultDate = new Date("2024-08-01");
  const [startDate, setStartDate] = useState(defaultDate);
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      excludeDates={[
        new Date("2024-05-01"),
        new Date("2024-02-01"),
        new Date("2024-01-01"),
        new Date("2024-11-01"),
      ]}
      dateFormat="MM/yyyy"
      placeholderText="Select a month other than the disabled months"
      showMonthYearPicker
      minDate={new Date("2023-06-01")}
      maxDate={new Date("2025-02-01")}
    />
  );
};
