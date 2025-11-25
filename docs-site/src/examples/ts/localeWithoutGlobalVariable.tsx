const LocaleWithoutGlobalVariable = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      locale={fi}
    />
  );
};

render(LocaleWithoutGlobalVariable);
