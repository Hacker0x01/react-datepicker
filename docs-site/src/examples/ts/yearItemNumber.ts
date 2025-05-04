const yearItemNumberTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showYearPicker
      dateFormat="yyyy"
      yearItemNumber={9}
    />
  );
};

render(<Example />);
`;

export default yearItemNumberTS;
