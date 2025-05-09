() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      excludeDates={[
        { date: new Date(), message: "Today is excluded" },
        { date: subDays(new Date(), 1), message: "This day is excluded" },
      ]}
      placeholderText="Select a date other than today or yesterday"
    />
  );
};
