const RangeYearPickerSelectsRange = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2014/02/08"),
  );
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChange = ([newStartDate, newEndDate]: [
    Date | null,
    Date | null,
  ]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      selectsRange
      startDate={startDate}
      endDate={endDate}
      dateFormat="yyyy"
      showYearPicker
    />
  );
};

render(RangeYearPickerSelectsRange);
