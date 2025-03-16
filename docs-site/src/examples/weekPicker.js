() => {
  const [selectedDate, setSelectedDate] = useState(new Date("2021/02/22"));
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="I/R"
      locale="en-GB"
      showWeekNumbers
      showWeekPicker
    />
  );
};
