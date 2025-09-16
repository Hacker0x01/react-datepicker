const CustomCalendarClassName = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      calendarClassName="rasta-stripes"
    />
  );
};

render(CustomCalendarClassName);
