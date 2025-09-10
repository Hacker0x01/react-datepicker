const ToggleCalendarOnIconClick = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      showIcon
      toggleCalendarOnIconClick
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
    />
  );
};

render(ToggleCalendarOnIconClick);
