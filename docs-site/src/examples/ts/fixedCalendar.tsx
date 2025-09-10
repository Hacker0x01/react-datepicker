const FixedCalendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      fixedHeight
    />
  );
};

render(FixedCalendar);
