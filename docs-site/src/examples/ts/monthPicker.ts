const monthPickerTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
    />
  );
};

render(<Example />);
`;

export default monthPickerTS;
