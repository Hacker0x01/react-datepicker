const CalendarStartDay = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      calendarStartDay={3}
    />
  );
};

render(CalendarStartDay);
