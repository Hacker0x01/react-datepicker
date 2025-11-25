const ToggleCalendarOnIconClick = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      showIcon
      toggleCalendarOnIconClick
      selected={selectedDate}
      onChange={setSelectedDate}
    />
  );
};

render(ToggleCalendarOnIconClick);
