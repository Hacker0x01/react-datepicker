() => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      disabledKeyboardNavigation
      placeholderText="This has disabled keyboard navigation"
    />
  );
};
