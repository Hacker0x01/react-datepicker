type TExcludeDate =
  | {
      date: Date;
      message?: string;
    }[]
  | Date[];

const SelectsRangeWithDisabledDates = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const excludeDates: TExcludeDate = [
    addDays(new Date(), 1),
    addDays(new Date(), 5),
  ];

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      excludeDates={excludeDates}
      selectsRange
      selectsDisabledDaysInRange
      inline
    />
  );
};

render(SelectsRangeWithDisabledDates);
