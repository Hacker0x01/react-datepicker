() => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      minDate={subDays(new Date(), 5)}
      placeholderText="Select a date after 5 days ago"
    />
  );
};
