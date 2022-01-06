() => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      includeDateIntervals={[
        { start: subDays(new Date(), 5), end: addDays(new Date(), 5) },
      ]}
      placeholderText="This only includes dates from 5 days ago to 5 days in the future"
    />
  );
};
