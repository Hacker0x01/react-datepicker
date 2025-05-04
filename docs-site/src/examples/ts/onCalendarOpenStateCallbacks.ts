const onCalendarOpenStateCallbacksTS = `
const Example = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

  return (
    <DatePicker
      selected={date}
      onChange={(date: Date | null) => setDate(date)}
      onCalendarClose={handleCalendarClose}
      onCalendarOpen={handleCalendarOpen}
    />
  );
};

render(<Example />);
`;

export default onCalendarOpenStateCallbacksTS;
