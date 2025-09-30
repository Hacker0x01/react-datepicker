const DateRange = () => {
  const [selectedDate, setStartDate] = useState<Date | null>(
    new Date("2014/02/08"),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2014/02/10"));

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setStartDate(date)}
        selectsStart
        startDate={selectedDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        selectsEnd
        startDate={selectedDate}
        endDate={endDate}
        minDate={selectedDate}
      />
    </>
  );
};

render(DateRange);
