() => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      openToDate={new Date("1993/09/28")}
    />
  );
};
