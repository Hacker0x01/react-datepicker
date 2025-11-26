const { setHours, setMinutes } = DateFNS;
type TExcludeTimes = Date[];

const ExcludeTimes = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 16),
  );

  const excludeTimes: TExcludeTimes = [
    setHours(setMinutes(new Date(), 0), 17),
    setHours(setMinutes(new Date(), 30), 18),
    setHours(setMinutes(new Date(), 30), 19),
    setHours(setMinutes(new Date(), 30), 17),
  ];

  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={setSelectedDateTime}
      showTimeSelect
      excludeTimes={excludeTimes}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

render(ExcludeTimes);
