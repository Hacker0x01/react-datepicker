const QuarterPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      dateFormat="yyyy, QQQ"
      showQuarterYearPicker
    />
  );
};

render(QuarterPicker);
