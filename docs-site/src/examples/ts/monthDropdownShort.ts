const monthDropdownShortTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showMonthDropdown
      useShortMonthInDropdown
    />
  );
};

render(<Example />);
`;

export default monthDropdownShortTS;
