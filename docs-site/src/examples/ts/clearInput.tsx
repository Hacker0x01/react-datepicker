const ClearInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      isClearable
      placeholderText="I have been cleared!"
    />
  );
};

render(ClearInput);
