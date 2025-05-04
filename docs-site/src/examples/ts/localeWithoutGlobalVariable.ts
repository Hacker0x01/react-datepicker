const localeWithoutGlobalVariableTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      locale={fi}
    />
  );
};

render(<Example />);
`;

export default localeWithoutGlobalVariableTS;
