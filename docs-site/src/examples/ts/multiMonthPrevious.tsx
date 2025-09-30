const MultiMonthPrevious = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      showPreviousMonths
      onChange={(date: Date | null) => setSelectedDate(date)}
      monthsShown={2}
    />
  );
};

render(MultiMonthPrevious);
