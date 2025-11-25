const TimeInput = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date(),
  );

  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={setSelectedDateTime}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
    />
  );
};

render(TimeInput);
