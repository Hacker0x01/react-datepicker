const CalendarIcon = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker showIcon selected={selectedDate} onChange={setSelectedDate} />
  );
};

render(CalendarIcon);
