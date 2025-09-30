const MaxDate = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      maxDate={DateFNS.addDays(new Date(), 5)}
      placeholderText="Select a date before 5 days in the future"
    />
  );
};

render(MaxDate);
