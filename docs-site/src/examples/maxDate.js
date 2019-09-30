() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      maxDate={addDays(new Date(), 5)}
      placeholderText="Select a date before 5 days in the future"
    />
  );
};
