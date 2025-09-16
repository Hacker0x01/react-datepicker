const MultiMonthDropdown = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      monthsShown={2}
      showYearDropdown
    />
  );
};

render(MultiMonthDropdown);
