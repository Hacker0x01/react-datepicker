const LocaleWithTime = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      locale="pt-BR"
      showTimeSelect
      timeFormat="p"
      timeIntervals={15}
      dateFormat="Pp"
    />
  );
};

render(LocaleWithTime);
