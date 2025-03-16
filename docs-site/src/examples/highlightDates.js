() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      highlightDates={[subDays(new Date(), 7), addDays(new Date(), 7)]}
      placeholderText="This highlights a week ago and a week from today"
    />
  );
};
