() => {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(
    ({ value, onClick }, ref) => (
      <button className="example-custom-input" onClick={onClick} ref={ref}>
        {value}
      </button>
    ),
  );
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};
