const Inline = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker selected={selectedDate} onChange={setSelectedDate} inline />
  );
};

render(Inline);
