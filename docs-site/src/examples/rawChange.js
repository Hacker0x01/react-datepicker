() => {
  const [startDate, setStartDate] = useState(null);
  const handleChangeRaw = value => {
    if (value === "tomorrow") {
      setStartDate(addDays(new Date(), 1));
    }
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      placeholderText='Enter "tomorrow"'
      onChangeRaw={event => handleChangeRaw(event.target.value)}
    />
  );
};
