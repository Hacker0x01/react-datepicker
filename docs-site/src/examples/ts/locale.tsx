const Locale = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      locale="en-GB"
      placeholderText="Weeks start on Monday"
    />
  );
};

render(Locale);
