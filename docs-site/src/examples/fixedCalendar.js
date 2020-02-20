() => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      fixedHeight
    />
  );
};
