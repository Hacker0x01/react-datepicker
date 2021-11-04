() => {
  const [startDate, setDate] = useState(new Date());
  return (
    <DatePicker
      startDate={startDate}
      onChange={(update) => {
        setDate(update);
      }}
      isClearable={true}
      monthNotShowsDuplicateDays={true}
    />
  );
};
