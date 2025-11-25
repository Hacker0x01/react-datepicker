type TExcludeDates =
  | Array<{
      date: Date;
      message?: string;
    }>
  | Array<Date>;

const ExcludeDatesRangeMonthPicker = () => {
  const defaultStartDate = new Date("2024-08-01");
  const defaultEndDate = new Date("2024-10-01");
  const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);

  const handleChange = ([newStartDate, newEndDate]: [
    Date | null,
    Date | null,
  ]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const excludeDates: TExcludeDates = [
    new Date("2024-05-01"),
    new Date("2024-02-01"),
    new Date("2024-01-01"),
    new Date("2024-11-01"),
  ];

  return (
    <DatePicker
      selected={startDate}
      startDate={startDate}
      endDate={endDate}
      onChange={handleChange}
      excludeDates={excludeDates}
      dateFormat="MM/yyyy"
      placeholderText="Select a month other than the disabled months"
      showMonthYearPicker
      selectsRange
    />
  );
};

render(ExcludeDatesRangeMonthPicker);
