const Default = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};

render(Default);
