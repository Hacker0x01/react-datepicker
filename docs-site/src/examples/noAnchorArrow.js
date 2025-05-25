() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      showPopperArrow={false}
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  );
};
