() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      dayClassName={date =>
        getDate(date) < Math.random() * 31 ? "random" : undefined
      }
    />
  );
};
