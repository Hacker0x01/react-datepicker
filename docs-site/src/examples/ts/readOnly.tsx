const ReadOnly = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      placeholderText="This is readOnly"
      readOnly
    />
  );
};

render(ReadOnly);
