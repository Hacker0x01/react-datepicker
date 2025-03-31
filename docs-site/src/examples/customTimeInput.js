() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const ExampleCustomTimeInput = ({ value, onChange }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.target?.focus()}
      style={{ border: "solid 1px pink" }}
    />
  );
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      showTimeInput
      customTimeInput={<ExampleCustomTimeInput />}
    />
  );
};
