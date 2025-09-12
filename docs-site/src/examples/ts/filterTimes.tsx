const { setHours, setMinutes } = DateFNS;
type TFilterTime = (time: Date) => boolean;

const FilterTimes = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 0), 9),
  );

  const filterPassedTime: TFilterTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showTimeSelect
      filterTime={filterPassedTime}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

render(FilterTimes);
