const YearItemNumber = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      showYearPicker
      dateFormat="yyyy"
      yearItemNumber={9}
    />
  );
};

render(YearItemNumber);
