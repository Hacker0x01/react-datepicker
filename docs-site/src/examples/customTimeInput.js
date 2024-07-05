() => {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomTimeInput = ({ date, value, onChange }) => {
    const handleInputClick = () => {
      inputRef.current.focus();
    };
    const inputRef = React.createRef(); 
    return (
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={handleInputClick}
        style={{ border: "solid 1px pink" }}
      />
    );
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeInput
      customTimeInput={<ExampleCustomTimeInput />}
    />
  );
};
