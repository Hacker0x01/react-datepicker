const SpecificDateRange = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      minDate={new Date()}
      maxDate={DateFNS.addDays(new Date(), 5)}
      placeholderText="Select a date between today and 5 days in the future"
    />
  );
};

render(SpecificDateRange);
