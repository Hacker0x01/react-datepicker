() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      dateFormat="yyyy, QQQ"
      showQuarterYearPicker
      maxDate={new Date(2019, 6, 1)}
    />
  );
};
