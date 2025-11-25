const { subDays, addDays } = DateFNS;
type HighlightDate = {
  [className: string]: Date[];
};

type THighlightDates = (Date | HighlightDate)[];

const HighlightDatesRanges = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const highlightWithRanges: THighlightDates = [
    {
      "react-datepicker__day--highlighted-custom-1": [
        subDays(new Date(), 4),
        subDays(new Date(), 3),
        subDays(new Date(), 2),
        subDays(new Date(), 1),
      ],
    },
    {
      "react-datepicker__day--highlighted-custom-2": [
        addDays(new Date(), 1),
        addDays(new Date(), 2),
        addDays(new Date(), 3),
        addDays(new Date(), 4),
      ],
    },
  ];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      highlightDates={highlightWithRanges}
      placeholderText="This highlight two ranges with custom classes"
    />
  );
};

render(HighlightDatesRanges);
