const MonthDropdownShort = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showMonthDropdown
      useShortMonthInDropdown
    />
  );
};

render(MonthDropdownShort);
