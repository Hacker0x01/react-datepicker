const DisabledTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      disabled
      placeholderText="This is disabled"
    />
  );
};

render(<Example />);
`;

export default DisabledTS;
