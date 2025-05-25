() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      excludeDateIntervals={[
        { start: subDays(new Date(), 5), end: addDays(new Date(), 5) },
      ]}
      placeholderText="Select a date other than the interval from 5 days ago to 5 days in the future"
    />
  );
};
