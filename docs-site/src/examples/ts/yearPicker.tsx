const YearPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      showYearPicker
      dateFormat="yyyy"
    />
  );
};

render(YearPicker);
