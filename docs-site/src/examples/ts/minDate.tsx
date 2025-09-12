const MinDate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      minDate={DateFNS.subDays(new Date(), 5)}
      placeholderText="Select a date after 5 days ago"
    />
  );
};

render(MinDate);
