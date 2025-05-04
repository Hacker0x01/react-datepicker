const filterDatesTS = `
type TFilterDate = (date: Date) => boolean;

const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const isWeekday: TFilterDate = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      filterDate={isWeekday}
      placeholderText="Select a weekday"
    />
  );
};

render(<Example />);
`;

export default filterDatesTS;
