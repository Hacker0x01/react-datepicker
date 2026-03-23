const ApplyDarkTheme = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      darkTheme={true}
      showTimeSelect
      timeFormat="HH:mm"
      dateFormat="MMMM d, yyyy hh:mm aa"
    />
  );
};

render(ApplyDarkTheme);
