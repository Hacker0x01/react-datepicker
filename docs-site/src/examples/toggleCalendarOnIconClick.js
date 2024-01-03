() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      showIcon
      toggleCalendarOnIconClick
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  );
};
