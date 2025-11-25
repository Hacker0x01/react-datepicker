type HighlightDate = {
  [className: string]: Date[];
};

type THighlightDates = (Date | HighlightDate)[];

const HighlightDates = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const highlightDates: THighlightDates = [
    DateFNS.subDays(new Date(), 7),
    DateFNS.addDays(new Date(), 7),
  ];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      highlightDates={highlightDates}
      placeholderText="This highlights a week ago and a week from today"
    />
  );
};

render(HighlightDates);
