() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      maxDate={addDays(new Date(), 5)}
      placeholderText="Select a date before 5 days in the future"
    />
  );
};
