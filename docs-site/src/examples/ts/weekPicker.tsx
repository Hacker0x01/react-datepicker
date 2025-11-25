const WeekPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2021/02/22"),
  );

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      dateFormat="I/R"
      locale="en-GB"
      showWeekNumbers
      showWeekPicker
    />
  );
};

render(WeekPicker);
