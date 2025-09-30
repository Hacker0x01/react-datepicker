const MinDate = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      minDate={DateFNS.subDays(new Date(), 5)}
      placeholderText="Select a date after 5 days ago"
    />
  );
};

render(MinDate);
