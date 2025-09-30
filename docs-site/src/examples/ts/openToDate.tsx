const OpenToDate = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      openToDate={new Date("1993/09/28")}
    />
  );
};

render(OpenToDate);
