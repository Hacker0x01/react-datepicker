() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      dateFormatCalendar={"MMM yyyy"}
      minDate={subMonths(new Date(), 6)}
      maxDate={addMonths(new Date(), 6)}
      showMonthYearDropdown
    />
  );
};
