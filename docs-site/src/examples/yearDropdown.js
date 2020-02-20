() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      showYearDropdown
      dateFormatCalendar="MMMM"
      yearDropdownItemNumber={15}
      scrollableYearDropdown
    />
  );
};
