const excludeDatesMonthPickerTS = `
type TExcludeDates = {
  date: Date;
  message?: string;
}[] | Date[];

const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date("2024-08-01"));

  const excludeDates: TExcludeDates = [
    new Date("2024-05-01"),
    new Date("2024-06-01"),
  ]

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      dateFormat="MM/yyyy"
      excludeDates={excludeDates}
      showMonthYearPicker
    />
  );
};

render(<Example />);
`;

export default excludeDatesMonthPickerTS;
