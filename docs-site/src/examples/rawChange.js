() => {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleChangeRaw = (value, selectedDateMeta) => {
    console.log(
      selectedDateMeta
        ? `Selected Date Meta: ${JSON.stringify(selectedDateMeta)}`
        : "No Selection Meta is available",
    );

    if (value === "tomorrow") {
      setSelectedDate(addDays(new Date(), 1));
    }
  };
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholderText='Enter "tomorrow"'
      onChangeRaw={(event, selectedDateMeta) =>
        handleChangeRaw(event.target.value, selectedDateMeta)
      }
    />
  );
};
