() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      closeOnScroll={(e) => e.target === document}
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  );
};
