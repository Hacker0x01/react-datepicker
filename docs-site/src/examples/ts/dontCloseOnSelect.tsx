const DontCloseOnSelect = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      shouldCloseOnSelect={false}
    />
  );
};

render(DontCloseOnSelect);
