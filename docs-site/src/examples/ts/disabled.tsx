const Disabled = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      disabled
      placeholderText="This is disabled"
    />
  );
};

render(Disabled);
