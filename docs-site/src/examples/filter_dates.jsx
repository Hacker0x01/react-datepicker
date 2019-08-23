() => {
  const [startDate, setStartDate] = useState(null);
  const isWeekday = date => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      filterDate={isWeekday}
      placeholderText="Select a weekday"
    />
  );
};
