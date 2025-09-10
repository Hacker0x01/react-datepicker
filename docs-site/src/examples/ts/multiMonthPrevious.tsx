const MultiMonthPrevious = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      showPreviousMonths
      onChange={(date: Date | null) => setStartDate(date)}
      monthsShown={2}
    />
  );
};

render(MultiMonthPrevious);
