const CustomDateFormat = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      dateFormat="yyyy/MM/dd"
      selected={selectedDate}
      onChange={setSelectedDate}
    />
  );
};

render(CustomDateFormat);
