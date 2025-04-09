() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      locale="en-GB"
      placeholderText="Weeks start on Monday"
    />
  );
};
