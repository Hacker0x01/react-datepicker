() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      showIcon
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  );
};
