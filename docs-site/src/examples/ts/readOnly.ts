const readOnlyTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      placeholderText="This is readOnly"
      readOnly
    />
  );
};

render(<Example />);
`;

export default readOnlyTS;
