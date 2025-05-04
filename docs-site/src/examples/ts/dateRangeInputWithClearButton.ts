const DateRangeInputWithClearButtonTS = `
const Example = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      onChange={(update: [Date | null, Date | null]) => {
        setDateRange(update);
      }}
      selectsRange
      isClearable
    />
  );
};

render(<Example />);
`;

export default DateRangeInputWithClearButtonTS;
