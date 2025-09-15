type TExcludeDates =
  | {
      date: Date;
      message?: string;
    }[]
  | Date[];

const ExcludeDates = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const excludeDates: TExcludeDates = [
    new Date(),
    DateFNS.subDays(new Date(), 1),
  ];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      excludeDates={excludeDates}
      placeholderText="Select a date other than today or yesterday"
    />
  );
};

render(ExcludeDates);
