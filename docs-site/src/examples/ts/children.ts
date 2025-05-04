const childrenTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker selected={startDate} onChange={(date: Date | null) => setStartDate(date)}>
      <div style={{ color: "red" }}>Don't forget to check the weather!</div>
    </DatePicker>
  );
};

render(<Example />);
`;

export default childrenTS;
