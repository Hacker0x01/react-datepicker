const FixedCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      fixedHeight
    />
  );
};

render(FixedCalendar);
