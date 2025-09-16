const CalendarIconExternal = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      showIcon
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      icon="fa fa-calendar"
    />
  );
};

render(CalendarIconExternal);
