const DateRange = () => {
  const [selectedDate, setStartDate] = useState<Date | null>(
    new Date("2014/02/08"),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2014/02/10"));

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={setStartDate}
        selectsStart
        startDate={selectedDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={setEndDate}
        selectsEnd
        startDate={selectedDate}
        endDate={endDate}
        minDate={selectedDate}
      />
    </>
  );
};

render(DateRange);
