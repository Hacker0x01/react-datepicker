() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      dateFormat="yyyy/MM/dd"
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  );
};
