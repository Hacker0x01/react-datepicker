() => {
  const [startDate, setStartDate] = useState(1661990400000);
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="MM/yyyy"
      includeDates={[
        1661990400000, 1664582400000, 1667260800000, 1672531200000,
      ]}
      showMonthYearPicker
    />
  );
};
