const openToDateTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      openToDate={new Date("1993/09/28")}
    />
  );
};

render(<Example />);
`;

export default openToDateTS;
