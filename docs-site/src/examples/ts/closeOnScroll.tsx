const CloseOnScroll = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      closeOnScroll
      selected={selectedDate}
      onChange={setSelectedDate}
    />
  );
};

render(CloseOnScroll);
