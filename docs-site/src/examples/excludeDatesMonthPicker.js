() => {
  const [startDate, setStartDate] = useState(1659312000000);
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="MM/yyyy"
      excludeDates={[1661990400000, 1664582400000, 1667260800000, 1672531200000]}
      showMonthYearPicker
    />
  );
};