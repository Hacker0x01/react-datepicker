const highlightDatesTS = `
type HighlightDate = {
  [className: string]: Date[];
}

type THighlightDates = (Date | HighlightDate)[];

const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const highlightDates: THighlightDates = [
    subDays(new Date(), 7),
    addDays(new Date(), 7),
  ];

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      highlightDates={highlightDates}
      placeholderText="This highlights a week ago and a week from today"
    />
  );
};

render(<Example />);
`;

export default highlightDatesTS;
