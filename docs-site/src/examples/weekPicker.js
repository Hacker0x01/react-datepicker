() => {
  const [startDate, setStartDate] = useState(new Date("2021/02/28"));
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      dateFormat="II/yyyy"
      showWeekNumbers
      showWeekPicker
    />
  );
};
