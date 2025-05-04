() => {
  const defaultStartDate = new Date("2024-08-01");
  const defaultEndDate = new Date("2024-10-01");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleChange = ([newStartDate, newEndDate]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <DatePicker
      selected={startDate}
      startDate={startDate}
      endDate={endDate}
      onChange={handleChange}
      excludeDates={[
        new Date("2024-05-01"),
        new Date("2024-02-01"),
        new Date("2024-01-01"),
        new Date("2024-11-01"),
      ]}
      dateFormat="MM/yyyy"
      placeholderText="Select a month other than the disabled months"
      showMonthYearPicker
      selectsRange
    />
  );
};
