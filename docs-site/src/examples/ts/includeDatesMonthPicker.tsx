type Timestamp = number; // milliseconds since Unix epoch

const IncludeDatesMonthPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const includeDates: Timestamp[] = [
    1661990400000, 1664582400000, 1667260800000, 1672531200000,
  ];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      dateFormat="MM/yyyy"
      includeDates={includeDates}
      showMonthYearPicker
    />
  );
};

render(IncludeDatesMonthPicker);
