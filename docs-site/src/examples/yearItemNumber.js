() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      showYearPicker
      dateFormat="yyyy"
      yearItemNumber={9}
    />
  );
};
