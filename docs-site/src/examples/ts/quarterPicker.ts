const quarterPickerTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      dateFormat="yyyy, QQQ"
      showQuarterYearPicker
    />
  );
};

render(<Example />);
`;

export default quarterPickerTS;
