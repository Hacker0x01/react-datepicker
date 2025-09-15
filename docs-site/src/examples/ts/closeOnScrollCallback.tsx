const CloseOnScrollCallback = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      closeOnScroll={(e: Event): boolean => e.target === document}
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
    />
  );
};

render(CloseOnScrollCallback);
