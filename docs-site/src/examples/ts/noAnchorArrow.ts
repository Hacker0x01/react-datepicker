const noAnchorArrowTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      showPopperArrow={false}
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
    />
  );
};

render(<Example />);
`;

export default noAnchorArrowTS;
