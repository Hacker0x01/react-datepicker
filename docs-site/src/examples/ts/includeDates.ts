const includeDatesTS = `
type TIncludeDates = Date[];
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const includeDates: TIncludeDates = [
    new Date(),
    addDays(new Date(), 1),
  ];

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      includeDates={includeDates}
      placeholderText="This only includes today and tomorrow"
    />
  );
};

render(<Example />);
`;

export default includeDatesTS;
