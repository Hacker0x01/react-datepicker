const Locale = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      locale="en-GB"
      placeholderText="Weeks start on Monday"
    />
  );
};

render(Locale);
