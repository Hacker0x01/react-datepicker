type TExcludeDateIntervals = Array<{
  start: Date | string;
  end: Date | string;
}>;

const ExcludeWeeks = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2021/02/22"),
  );

  const excludeWeeks: TExcludeDateIntervals = [
    { start: "2021/02/08", end: "2021/02/14" },
    { start: "2021/01/18", end: "2021/01/24" },
  ];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      dateFormat="I/R"
      locale="en-GB"
      excludeDateIntervals={excludeWeeks}
      showWeekNumbers
      showWeekPicker
    />
  );
};

render(ExcludeWeeks);
