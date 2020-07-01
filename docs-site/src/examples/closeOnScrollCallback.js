() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      closeOnScroll={e => e.target === document}
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
  );
};
