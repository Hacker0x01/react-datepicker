() => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <DatePicker
      showTimeSelect
      selected={selectedDateTime}
      onChange={(date) => setSelectedDateTime(date)}
      timeClassName={handleColor}
    />
  );
};
