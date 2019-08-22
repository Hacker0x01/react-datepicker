() => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      minDate={subDays(new Date(), 5)}
      placeholderText="Select a date after 5 days ago"
    />
  );
};
