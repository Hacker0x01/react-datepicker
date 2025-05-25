() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      closeOnScroll={true}
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  );
};
