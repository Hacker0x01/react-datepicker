() => {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleChangeRaw = (value) => {
    if (value === "tomorrow") {
      setSelectedDate(addDays(new Date(), 1));
    }
  };
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholderText='Enter "tomorrow"'
      onChangeRaw={(event) => handleChangeRaw(event.target.value)}
    />
  );
};
