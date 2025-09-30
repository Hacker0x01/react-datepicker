const DisabledInline = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      disabled
      inline
    />
  );
};

render(DisabledInline);
