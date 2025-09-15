const TimeInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
    />
  );
};

render(TimeInput);
