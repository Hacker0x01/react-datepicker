const CustomTimeClassName = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date(),
  );

  const handleColor = (time: Date): string => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <DatePicker
      showTimeSelect
      selected={selectedDateTime}
      onChange={(date: Date | null) => setSelectedDateTime(date)}
      timeClassName={handleColor}
    />
  );
};

render(CustomTimeClassName);
