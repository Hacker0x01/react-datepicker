() => {
  const [startDate, setStartDate] = useState(new Date("2021/02/22"));
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="I/R"
      locale="en-GB"
      showWeekNumbers
      showWeekPicker
    />
  );
};
