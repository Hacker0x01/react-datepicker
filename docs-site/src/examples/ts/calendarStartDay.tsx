const CalendarStartDay = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      calendarStartDay={3}
    />
  );
};

render(CalendarStartDay);
