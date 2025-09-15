const LocaleWithTime = () => {
  const [selectedDate, setSelectedDateTime] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDateTime(date)}
      locale="pt-BR"
      showTimeSelect
      timeFormat="p"
      timeIntervals={15}
      dateFormat="Pp"
    />
  );
};

render(LocaleWithTime);
