const DateRange = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2014/02/08"),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2014/02/10"));

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
};

render(DateRange);
