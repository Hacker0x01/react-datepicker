const DisabledKeyboardNavigation = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      disabledKeyboardNavigation
      placeholderText="This has disabled keyboard navigation"
    />
  );
};

render(DisabledKeyboardNavigation);
