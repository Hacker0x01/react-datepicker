const { setHours, setMinutes } = DateFNS;

const IncludeTimes = () => {
  const [selectedDate, setSelectedDateTime] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 16),
  );

  const includeTimes: Date[] = [
    setHours(setMinutes(new Date(), 0), 17),
    setHours(setMinutes(new Date(), 30), 18),
    setHours(setMinutes(new Date(), 30), 19),
    setHours(setMinutes(new Date(), 30), 17),
  ];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDateTime(date)}
      showTimeSelect
      includeTimes={includeTimes}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

render(IncludeTimes);
