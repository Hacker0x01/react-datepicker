() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      excludeDates={[new Date(), subDays(new Date(), 1)]}
      placeholderText="Select a date other than today or yesterday"
    />
  );
};
