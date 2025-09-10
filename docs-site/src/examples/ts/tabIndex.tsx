const TabIndex = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker selected={startDate} onChange={setStartDate} tabIndex={1} />
  );
};

render(TabIndex);
