const strictParsingTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      strictParsing
    />
  );
};

render(<Example />);
`;

export default strictParsingTS;
