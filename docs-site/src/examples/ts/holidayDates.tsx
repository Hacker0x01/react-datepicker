type Holiday = {
  date: string;
  holidayName: string;
};

const HolidayDates = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const holidays: Holiday[] = [
    {
      date: `${today.getFullYear()}-03-15`,
      holidayName: "India's Independence Day",
    },
    { date: `${today.getFullYear()}-12-31`, holidayName: "New Year's Eve" },
    { date: `${today.getFullYear()}-12-25`, holidayName: "Christmas" },
    { date: `${today.getFullYear()}-01-01`, holidayName: "New Year's Day" },
    { date: `${today.getFullYear()}-11-23`, holidayName: "Thanksgiving Day" },
  ];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      holidays={holidays}
      placeholderText="This display holidays"
    />
  );
};

render(HolidayDates);
