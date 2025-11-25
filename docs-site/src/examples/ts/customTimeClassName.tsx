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
      onChange={setSelectedDateTime}
      timeClassName={handleColor}
    />
  );
};

render(CustomTimeClassName);
