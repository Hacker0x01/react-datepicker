() => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      closeOnScroll
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};
