const Children = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker selected={selectedDate} onChange={setSelectedDate}>
      <div style={{ color: "red" }}>Don't forget to check the weather!</div>
    </DatePicker>
  );
};

render(Children);
