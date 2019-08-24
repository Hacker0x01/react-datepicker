() => {
  const [startDate, setStartDate] = useState(null);
  const handleOnBlur = ({ target: { value } }) => {
    const date = new Date(value);
    if (isValid(date)) {
      console.log("date: %s", format(date, "dd/MM/yyyy"));
    } else {
      console.log("value: %s", date);
    }
  };
  return (
    <DatePicker
      key="example9"
      selected={startDate}
      onChange={date => setStartDate(date)}
      onBlur={handleOnBlur}
      placeholderText="View blur callbacks in console"
    />
  );
};
