() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      highlightDates={[subDays(new Date(), 7), addDays(new Date(), 7)]}
      placeholderText="This highlights a week ago and a week from today"
    />
  );
};
