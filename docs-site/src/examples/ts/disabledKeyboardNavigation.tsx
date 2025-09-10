const DisabledKeyboardNavigation = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      disabledKeyboardNavigation
      placeholderText="This has disabled keyboard navigation"
    />
  );
};

render(DisabledKeyboardNavigation);
