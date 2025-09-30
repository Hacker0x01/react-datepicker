const DisabledKeyboardNavigation = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      disabledKeyboardNavigation
      placeholderText="This has disabled keyboard navigation"
    />
  );
};

render(DisabledKeyboardNavigation);
