const CustomDayClassName = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      dayClassName={(date: Date) =>
        DateFNS.getDate(date) < Math.random() * 31 ? "random" : undefined
      }
    />
  );
};

render(CustomDayClassName);
