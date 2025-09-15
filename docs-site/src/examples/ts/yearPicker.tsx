const YearPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      showYearPicker
      dateFormat="yyyy"
    />
  );
};

render(YearPicker);
