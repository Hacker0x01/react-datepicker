const DisabledInline = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      disabled
      inline
    />
  );
};

render(DisabledInline);
