const Portal = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker selected={selectedDate} onChange={setSelectedDate} withPortal />
  );
};

render(Portal);
