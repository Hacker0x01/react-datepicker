() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dayClassName={(date) =>
        getDate(date) < Math.random() * 31 ? "random" : undefined
      }
    />
  );
};
