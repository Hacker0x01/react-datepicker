() => {
  const [selectedDates, setSelectedDates] = useState([new Date()]);
  const onChange = (dates) => {
    setSelectedDates(dates);
  };
  return (
    <DatePicker
      selectedDates={selectedDates}
      selectsMultiple
      onChange={onChange}
      shouldCloseOnSelect={false}
      disabledKeyboardNavigation
    />
  );
};
