() => {
  const [startDate, setStartDate] = useState(new Date());
  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": [
        subDays(new Date(), 4),
        subDays(new Date(), 3),
        subDays(new Date(), 2),
        subDays(new Date(), 1)
      ]
    },
    {
      "react-datepicker__day--highlighted-custom-2": [
        addDays(new Date(), 1),
        addDays(new Date(), 2),
        addDays(new Date(), 3),
        addDays(new Date(), 4)
      ]
    }
  ];
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      highlightDates={highlightWithRanges}
      placeholderText="This highlight two ranges with custom classes"
    />
  );
};
