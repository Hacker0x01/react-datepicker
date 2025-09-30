const YearSelectDropdown = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  );
};

render(YearSelectDropdown);
