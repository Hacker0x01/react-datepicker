const OnCalendarOpenStateCallbacks = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

  return (
    <DatePicker
      selected={date}
      onChange={setDate}
      onCalendarClose={handleCalendarClose}
      onCalendarOpen={handleCalendarOpen}
    />
  );
};

render(OnCalendarOpenStateCallbacks);
