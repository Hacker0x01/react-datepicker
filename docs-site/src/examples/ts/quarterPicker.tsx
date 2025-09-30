const QuarterPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      dateFormat="yyyy, QQQ"
      showQuarterYearPicker
    />
  );
};

render(QuarterPicker);
