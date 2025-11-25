const MonthPickerFourColumns = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      showFourColumnMonthYearPicker
    />
  );
};

render(MonthPickerFourColumns);
