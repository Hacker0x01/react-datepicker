const ReadOnly = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      placeholderText="This is readOnly"
      readOnly
    />
  );
};

render(ReadOnly);
