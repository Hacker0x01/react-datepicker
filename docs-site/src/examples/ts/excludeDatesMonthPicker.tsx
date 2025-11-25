type TExcludeDates =
  | {
      date: Date;
      message?: string;
    }[]
  | Date[];

const ExcludeDatesMonthPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2024-08-01"),
  );

  const excludeDates: TExcludeDates = [
    new Date("2024-05-01"),
    new Date("2024-06-01"),
  ];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      dateFormat="MM/yyyy"
      excludeDates={excludeDates}
      showMonthYearPicker
    />
  );
};

render(ExcludeDatesMonthPicker);
