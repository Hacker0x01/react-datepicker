const CustomCalendarClassNameTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      calendarClassName="rasta-stripes"
    />
  );
};

render(<Example />);
`;

export default CustomCalendarClassNameTS;
