() => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      placeholderText="This is readOnly"
      readOnly
    />
  );
};
