const WeekPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2021/02/22"),
  );

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      dateFormat="I/R"
      locale="en-GB"
      showWeekNumbers
      showWeekPicker
    />
  );
};

render(WeekPicker);
