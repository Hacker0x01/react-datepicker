() => {
  const [selectedDate, setSelectedDate] = useState(null);
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      filterDate={isWeekday}
      placeholderText="Select a weekday"
    />
  );
};
