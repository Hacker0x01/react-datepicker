const MonthDropdown = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showMonthDropdown
    />
  );
};

render(MonthDropdown);
