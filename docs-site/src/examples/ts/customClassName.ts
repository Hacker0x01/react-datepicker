const CustomClassNameTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      className="red-border"
    />
  );
};

render(<Example />);
`;

export default CustomClassNameTS;
