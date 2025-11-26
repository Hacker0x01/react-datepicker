const Default = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return <DatePicker selected={selectedDate} onChange={handleChange} />;
};

render(Default);
