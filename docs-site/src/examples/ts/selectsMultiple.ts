const selectsMultipleTS = `
const Example = () => {
  const [selectedDates, setSelectedDates] = useState<Date[] | null>([new Date()]);

  const onChange = (dates: Date[] | null) => {
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

render(<Example />);
`;

export default selectsMultipleTS;
