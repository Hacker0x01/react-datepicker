const CalendarStartDay = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      calendarStartDay={3}
    />
  );
};

render(CalendarStartDay);
