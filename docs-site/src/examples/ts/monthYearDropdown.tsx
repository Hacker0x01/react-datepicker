const { subMonths, addMonths } = DateFNS;

const MonthYearDropdown = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      dateFormatCalendar={"MMM yyyy"}
      minDate={subMonths(new Date(), 6)}
      maxDate={addMonths(new Date(), 6)}
      showMonthYearDropdown
    />
  );
};

render(MonthYearDropdown);
