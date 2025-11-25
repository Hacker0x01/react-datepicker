const NoAnchorArrow = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      showPopperArrow={false}
      selected={selectedDate}
      onChange={setSelectedDate}
    />
  );
};

render(NoAnchorArrow);
