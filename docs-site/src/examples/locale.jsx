() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      locale="en-GB"
      placeholderText="Weeks start on Monday"
    />
  );
};
