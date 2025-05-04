const rangeQuarterPickerTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState<Date | null>(new Date("2014/07/08"));

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy, QQQ"
        showQuarterYearPicker
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy, QQQ"
        showQuarterYearPicker
      />
    </>
  );
};

render(<Example />);
`;

export default rangeQuarterPickerTS;
