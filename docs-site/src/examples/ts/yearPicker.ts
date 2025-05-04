const yearPickerTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showYearPicker
      dateFormat="yyyy"
    />
  );
};

render(<Example />);
`;

export default yearPickerTS;
