const CalendarIconExternal = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      showIcon
      selected={selectedDate}
      onChange={setSelectedDate}
      icon="fa fa-calendar"
    />
  );
};

render(CalendarIconExternal);
