const WeekNumbers = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      locale="en-GB"
      showWeekNumbers
    />
  );
};

render(WeekNumbers);
