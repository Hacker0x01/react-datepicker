() => {
  const [startDate, setStartDate] = useState(new Date());
  const holidayData = [
    { date: subDays(new Date(), 1), name: "Christmas" },
    { date: subDays(new Date(), 4), name: "New Year" },
    { date: addDays(new Date(), 1), name: "Republic Day " },
    { date: addDays(new Date(), 2), name: "Independence Day " },
    { date: addDays(new Date(), 3), name: "Easter" },
  ];
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      highlightHolidayDates={holidayData}
      placeholderText="This highlights a week ago and a week from today"
    />
  );
};
