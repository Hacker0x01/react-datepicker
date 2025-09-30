const YearItemNumber = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      showYearPicker
      dateFormat="yyyy"
      yearItemNumber={9}
    />
  );
};

render(YearItemNumber);
