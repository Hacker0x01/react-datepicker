const selectsMultipleMonthsTS = `
const Example = () => {
  const [selectedDates, setSelectedDates] = useState<Date[] | null>(null);

  const onChange = (dates: Date[] | null) => {
    setSelectedDates(dates);
  };

  return (
    <DatePicker
      selectedDates={selectedDates}
      selectsMultiple
      showMonthYearPicker
      show
      onChange={onChange}
      shouldCloseOnSelect={false}
      disabledKeyboardNavigation
    />
  );
};

render(<Example />);
`;

export default selectsMultipleMonthsTS;
