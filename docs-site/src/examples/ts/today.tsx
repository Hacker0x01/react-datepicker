const Today = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      todayButton="Vandaag"
      selected={selectedDate}
      onChange={setSelectedDate}
    />
  );
};

render(Today);
