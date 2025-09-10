type Holiday = {
  date: string;
  holidayName: string;
};

const HolidayDates = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const holidays: Holiday[] = [
    { date: "2023-08-15", holidayName: "India's Independence Day" },
    { date: "2023-12-31", holidayName: "New Year's Eve" },
    { date: "2023-12-25", holidayName: "Christmas" },
    { date: "2024-01-01", holidayName: "New Year's Day" },
    { date: "2023-11-23", holidayName: "Thanksgiving Day" },
  ];

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      holidays={holidays}
      placeholderText="This display holidays"
    />
  );
};

render(HolidayDates);
