const DontCloseOnSelect = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      shouldCloseOnSelect={false}
    />
  );
};

render(DontCloseOnSelect);
