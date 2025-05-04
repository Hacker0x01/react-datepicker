() => {
  const [startDate, setStartDate] = useState(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState(null);

  const handleChange = ([newStartDate, newEndDate]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      selectsRange
      startDate={startDate}
      endDate={endDate}
      dateFormat="yyyy, QQQ"
      showQuarterYearPicker
    />
  );
};
