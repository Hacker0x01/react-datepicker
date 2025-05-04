const dateRangeWithShowDisabledNavigationTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 5)}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
      showDisabledMonthNavigation
    />
  );
};

render(<Example />);
`;

export default dateRangeWithShowDisabledNavigationTS;
