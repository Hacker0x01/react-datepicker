() => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );
  const from9to5 = time => {
    const hour = getHours(time);
    return hour >= 9 && hour < 17;
  }
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      showTimeSelect
      filterTime={from9to5}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};
