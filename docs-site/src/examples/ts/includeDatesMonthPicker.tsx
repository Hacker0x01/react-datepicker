const IncludeDatesMonthPicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const includeDates: Date[] = [
    1661990400000, 1664582400000, 1667260800000, 1672531200000,
  ];

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      dateFormat="MM/yyyy"
      includeDates={includeDates}
      showMonthYearPicker
    />
  );
};

render(IncludeDatesMonthPicker);
