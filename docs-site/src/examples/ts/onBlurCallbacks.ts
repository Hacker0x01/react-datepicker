const onBlurCallbacksTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleOnBlur = ({ target: { value } }: React.FocusEvent<HTMLElement>) => {
    const date = new Date(value);
    if (isValid(date)) {
      console.log("date: %s", format(date, "dd/MM/yyyy"));
    } else {
      console.log("value: %s", date);
    }
  };

  return (
    <DatePicker
      key="example9"
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      onBlur={handleOnBlur}
      placeholderText="View blur callbacks in console"
    />
  );
};

render(<Example />);
`;

export default onBlurCallbacksTS;
