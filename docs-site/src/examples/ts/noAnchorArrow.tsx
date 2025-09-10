const NoAnchorArrow = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      showPopperArrow={false}
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
    />
  );
};

render(NoAnchorArrow);
