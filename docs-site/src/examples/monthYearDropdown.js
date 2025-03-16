() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormatCalendar={"MMM yyyy"}
      minDate={subMonths(new Date(), 6)}
      maxDate={addMonths(new Date(), 6)}
      showMonthYearDropdown
    />
  );
};
