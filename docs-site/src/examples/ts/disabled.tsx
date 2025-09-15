const Disabled = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      disabled
      placeholderText="This is disabled"
    />
  );
};

render(Disabled);
