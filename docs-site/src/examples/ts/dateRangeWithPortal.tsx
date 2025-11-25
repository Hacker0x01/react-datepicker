const DateRangeWithPortal = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      onChange={setDateRange}
      selectsRange
      withPortal
    />
  );
};

render(DateRangeWithPortal);
