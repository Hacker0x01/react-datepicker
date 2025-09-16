const WeekNumbers = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      locale="en-GB"
      showWeekNumbers
    />
  );
};

render(WeekNumbers);
