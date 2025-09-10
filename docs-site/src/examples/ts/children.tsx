const Children = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
    >
      <div style={{ color: "red" }}>Don't forget to check the weather!</div>
    </DatePicker>
  );
};

render(Children);
