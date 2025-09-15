const HideTimeCaption = () => {
  const [selectedDate, setSelectedDateTime] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDateTime(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="h:mm aa"
      showTimeCaption={false}
    />
  );
};

render(HideTimeCaption);
