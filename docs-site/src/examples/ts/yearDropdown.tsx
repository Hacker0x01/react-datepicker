const YearDropdown = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      showYearDropdown
      dateFormatCalendar="MMMM"
      yearDropdownItemNumber={15}
      scrollableYearDropdown
    />
  );
};

render(YearDropdown);
