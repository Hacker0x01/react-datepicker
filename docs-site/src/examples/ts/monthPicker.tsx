const MonthPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
    />
  );
};

render(MonthPicker);
