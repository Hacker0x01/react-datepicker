() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      closeOnScroll={true}
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
  );
};
