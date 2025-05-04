const todayTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      todayButton="Vandaag"
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
    />
  );
};

render(<Example />);
`;

export default todayTS;
