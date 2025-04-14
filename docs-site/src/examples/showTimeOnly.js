() => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={(date) => setSelectedDateTime(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
  );
};
