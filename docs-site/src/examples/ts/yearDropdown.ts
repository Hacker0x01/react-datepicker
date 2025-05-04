const yearDropdownTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showYearDropdown
      dateFormatCalendar="MMMM"
      yearDropdownItemNumber={15}
      scrollableYearDropdown
    />
  );
};

render(<Example />);
`;

export default yearDropdownTS;
