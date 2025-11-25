const MultiMonthPrevious = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      showPreviousMonths
      onChange={setSelectedDate}
      monthsShown={2}
    />
  );
};

render(MultiMonthPrevious);
