() => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 5)}
      showDisabledMonthNavigation
    />
  );
};
