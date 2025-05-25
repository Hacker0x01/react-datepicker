() => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      includeDates={[new Date(), addDays(new Date(), 1)]}
      placeholderText="This only includes today and tomorrow"
    />
  );
};
