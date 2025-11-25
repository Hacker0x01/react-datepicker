const ReadOnly = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      placeholderText="This is readOnly"
      readOnly
    />
  );
};

render(ReadOnly);
