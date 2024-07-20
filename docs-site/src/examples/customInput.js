() => {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <button className={className} onClick={onClick} ref={ref}>
        {value}
      </button>
    ),
  );
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput className="example-custom-input" />}
    />
  );
};
