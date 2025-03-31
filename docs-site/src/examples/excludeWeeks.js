() => {
  const [selectedDate, setSelectedDate] = useState(new Date("2021/02/22"));
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="I/R"
      locale="en-GB"
      excludeDateIntervals={[
        { start: "2021/02/08", end: "2021/02/14" },
        { start: "2021/01/18", end: "2021/01/24" },
      ]}
      showWeekNumbers
      showWeekPicker
    />
  );
};
