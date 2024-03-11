() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      excludeDates={[
        { date: new Date(), message: "Today is excluded" },
        { date: subDays(new Date(), 1), message: "This day is excluded" },
      ]}
      placeholderText="Select a date other than today or yesterday"
    />
  );
};
