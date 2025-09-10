type TExcludeDates =
  | {
      date: Date;
      message?: string;
    }[]
  | Date[];

const ExcludeDates = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const excludeDates: TExcludeDates = [new Date(), subDays(new Date(), 1)];

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      excludeDates={excludeDates}
      placeholderText="Select a date other than today or yesterday"
    />
  );
};

render(ExcludeDates);
