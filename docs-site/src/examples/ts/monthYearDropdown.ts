const monthYearDropdownTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      dateFormatCalendar={"MMM yyyy"}
      minDate={subMonths(new Date(), 6)}
      maxDate={addMonths(new Date(), 6)}
      showMonthYearDropdown
    />
  );
};

render(<Example />);
`;

export default monthYearDropdownTS;
