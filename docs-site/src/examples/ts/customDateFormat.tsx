const CustomDateFormat = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      dateFormat="yyyy/MM/dd"
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
    />
  );
};

render(CustomDateFormat);
