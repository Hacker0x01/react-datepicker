() => {
  const defaultDate = new Date("2024-05-01");
  const [startDate, setStartDate] = useState(defaultDate);
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      excludeDates={[
        subMonths(defaultDate, 1),
        subMonths(defaultDate, 3),
        addMonths(defaultDate, 6),
      ]}
      dateFormat="MM/yyyy"
      placeholderText="Select a month other than this month or last last month"
      showMonthYearPicker
      minDate={new Date("2023-06-01")}
      maxDate={new Date("2025-02-01")}
    />
  );
};
