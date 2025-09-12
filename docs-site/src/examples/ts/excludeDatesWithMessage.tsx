type TExcludeDates =
  | {
      date: Date;
      message?: string;
    }[]
  | Date[];

const ExcludeDatesWithMessage = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const excludeDates: TExcludeDates = [
    { date: new Date(), message: "Today is excluded" },
    { date: DateFNS.subDays(new Date(), 1), message: "This day is excluded" },
  ];

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      excludeDates={excludeDates}
      placeholderText="Select a date other than today or yesterday"
    />
  );
};

render(ExcludeDatesWithMessage);
