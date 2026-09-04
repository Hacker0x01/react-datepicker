const RangeTimeInputLabels = () => {
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
      startDate={startDate}
      endDate={endDate}
      selectsRange
      showTimeInput
      timeInputStartLabel="Start time"
      timeInputEndLabel="End time"
      dateFormat="MM/dd/yyyy h:mm aa"
    />
  );
};

render(RangeTimeInputLabels);
