const toggleCalendarOnIconClickTS = `
const Example = () => {
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

render(<Example />);
`;

export default toggleCalendarOnIconClickTS;
