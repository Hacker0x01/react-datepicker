() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      weekClassName={(date) =>
        getDate(date) % 2 === 0 ? "highlighted" : undefined
      }
    />
  );
};
