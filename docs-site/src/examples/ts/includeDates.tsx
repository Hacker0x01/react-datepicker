const { addDays } = DateFNS;
type TIncludeDates = Date[];

const IncludeDates = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const includeDates: TIncludeDates = [new Date(), addDays(new Date(), 1)];

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      includeDates={includeDates}
      placeholderText="This only includes today and tomorrow"
    />
  );
};

render(IncludeDates);
