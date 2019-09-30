() => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      includeDates={[new Date(), addDays(new Date(), 1)]}
      placeholderText="This only includes today and tomorrow"
    />
  );
};
