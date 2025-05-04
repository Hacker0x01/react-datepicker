const monthDropdownTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showMonthDropdown
    />
  );
};

render(<Example />);
`;

export default monthDropdownTS;
