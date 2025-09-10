const MonthPickerTwoColumns = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      showTwoColumnMonthYearPicker
    />
  );
};

render(MonthPickerTwoColumns);
