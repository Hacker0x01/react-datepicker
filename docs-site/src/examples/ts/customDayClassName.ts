const CustomDayClassNameTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      dayClassName={(date: Date) =>
        getDate(date) < Math.random() * 31 ? "random" : undefined
      }
    />
  );
};

render(<Example />);
`;

export default CustomDayClassNameTS;
