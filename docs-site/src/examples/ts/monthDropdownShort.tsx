const MonthDropdownShort = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      showMonthDropdown
      useShortMonthInDropdown
    />
  );
};

render(MonthDropdownShort);
