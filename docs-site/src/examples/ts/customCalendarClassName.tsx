const CustomCalendarClassName = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      calendarClassName="rasta-stripes"
    />
  );
};

render(CustomCalendarClassName);
