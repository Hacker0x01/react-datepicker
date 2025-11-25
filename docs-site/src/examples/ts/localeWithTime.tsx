const LocaleWithTime = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date(),
  );

  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={setSelectedDateTime}
      locale="pt-BR"
      showTimeSelect
      timeFormat="p"
      timeIntervals={15}
      dateFormat="Pp"
    />
  );
};

render(LocaleWithTime);
