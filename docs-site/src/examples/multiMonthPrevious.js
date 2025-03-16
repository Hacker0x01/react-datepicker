() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      showPreviousMonths
      onChange={(date) => setSelectedDate(date)}
      monthsShown={2}
    />
  );
};
