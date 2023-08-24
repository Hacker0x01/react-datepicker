() => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      holidays={[
        { date: "2023-08-15", holidayName: "India's Independence Day" },
        { date: "2023-12-31", holidayName: "New Year's Eve" },
        { date: "2023-12-25", holidayName: "Christmas" },
        { date: "2024-01-01", holidayName: "New Year's Day" },
        { date: "2023-11-23", holidayName: "Thanksgiving Day" },
        { date: "2023-12-25", holidayName: "Fake holiday" },
      ]}
      placeholderText="This display holidays"
    />
  );
};
