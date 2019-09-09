() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      showPopperArrow={false}
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
  );
};
