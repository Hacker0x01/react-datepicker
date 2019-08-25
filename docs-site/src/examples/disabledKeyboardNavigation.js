() => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      disabledKeyboardNavigation
      placeholderText="This has disabled keyboard navigation"
    />
  );
};
