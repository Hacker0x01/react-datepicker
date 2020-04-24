() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
    />
  );
};
