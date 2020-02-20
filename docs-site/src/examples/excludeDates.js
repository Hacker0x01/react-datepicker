() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      excludeDates={[new Date(), subDays(new Date(), 1)]}
      placeholderText="Select a date other than today or yesterday"
    />
  );
};
