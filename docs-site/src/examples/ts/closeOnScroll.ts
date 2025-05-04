const closeOnScrollTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      closeOnScroll
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
    />
  );
};

render(<Example />);
`;

export default closeOnScrollTS;
