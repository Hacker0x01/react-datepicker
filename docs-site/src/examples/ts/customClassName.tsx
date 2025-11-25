const CustomClassName = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      className="red-border"
    />
  );
};

render(CustomClassName);
