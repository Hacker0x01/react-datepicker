const MultiMonthInline = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      monthsShown={2}
      inline
    />
  );
};

render(MultiMonthInline);
