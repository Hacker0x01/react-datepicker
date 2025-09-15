const ShowTime = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date(),
  );

  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={(date: Date | null) => setSelectedDateTime(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

render(ShowTime);
