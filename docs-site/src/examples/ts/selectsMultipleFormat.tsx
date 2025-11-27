const SelectsMultipleFormat = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const onChange = (dates: Date[] | null) => {
    setSelectedDates(dates ?? []);
  };

  const formatMultipleDates = (
    dates: Date[],
    formatDate: (date: Date) => string,
  ) => {
    return dates.map(formatDate).join(" | ");
  };

  return (
    <DatePicker
      selectedDates={selectedDates}
      selectsMultiple
      onChange={onChange}
      shouldCloseOnSelect={false}
      disabledKeyboardNavigation
      formatMultipleDates={formatMultipleDates}
    />
  );
};

render(SelectsMultipleFormat);
