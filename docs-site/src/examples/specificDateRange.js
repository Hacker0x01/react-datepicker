() => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      minDate={new Date()}
      maxDate={addDays(new Date(), 5)}
      placeholderText="Select a date between today and 5 days in the future"
    />
  );
};
