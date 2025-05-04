const weekPickerTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date("2021/02/22"));

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      dateFormat="I/R"
      locale="en-GB"
      showWeekNumbers
      showWeekPicker
    />
  );
};

render(<Example />);
`;

export default weekPickerTS;
