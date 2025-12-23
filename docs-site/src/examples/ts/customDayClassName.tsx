const CustomDayClassName = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const getDayClassName = (date: Date): string => {
    return date.getDate() === 1 ? "highlighted-day" : "";
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      dayClassName={getDayClassName}
    />
  );
};

render(CustomDayClassName);
