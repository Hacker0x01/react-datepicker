const Disabled = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      disabled
      placeholderText="This is disabled"
    />
  );
};

render(Disabled);
