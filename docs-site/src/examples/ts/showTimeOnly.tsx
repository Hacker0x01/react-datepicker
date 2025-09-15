const ShowTimeOnly = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date(),
  );

  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={(date: Date | null) => setSelectedDateTime(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
  );
};

render(ShowTimeOnly);
