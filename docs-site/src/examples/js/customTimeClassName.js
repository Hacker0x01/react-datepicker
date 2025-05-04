() => {
  const [startDate, setStartDate] = useState(new Date());

  const handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <DatePicker
      showTimeSelect
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      timeClassName={handleColor}
    />
  );
};
