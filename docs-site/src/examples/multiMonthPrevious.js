() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      showPreviousMonths
      onChange={date => setStartDate(date)}
      monthsShown={2}
    />
  );
};
