const calendarIconExternalTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      showIcon
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      icon="fa fa-calendar"
    />
  );
};

render(<Example />);
`;

export default calendarIconExternalTS;
