const TabIndex = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      tabIndex={1}
    />
  );
};

render(TabIndex);
