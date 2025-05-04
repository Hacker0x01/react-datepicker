const DontCloseOnSelectTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      shouldCloseOnSelect={false}
    />
  );
};

render(<Example />);
`;

export default DontCloseOnSelectTS;
