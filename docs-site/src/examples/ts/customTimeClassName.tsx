const CustomTimeClassName = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleColor = (time: Date): string => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <DatePicker
      showTimeSelect
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      timeClassName={handleColor}
    />
  );
};

render(CustomTimeClassName);
