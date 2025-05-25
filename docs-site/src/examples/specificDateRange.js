() => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      minDate={new Date()}
      maxDate={addDays(new Date(), 5)}
      placeholderText="Select a date between today and 5 days in the future"
    />
  );
};
