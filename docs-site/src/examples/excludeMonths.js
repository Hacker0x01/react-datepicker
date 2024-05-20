() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      excludeDates={[
        subMonths(new Date(), 2),
      ]}
      dateFormat="MM/yyyy"
      placeholderText="Select a month other than the disabled months"
      showMonthYearPicker
    />
  );
};
