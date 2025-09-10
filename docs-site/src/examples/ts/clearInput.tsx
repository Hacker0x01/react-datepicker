const ClearInput = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      isClearable
      placeholderText="I have been cleared!"
    />
  );
};

render(ClearInput);
