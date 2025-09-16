const ExternalForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        required
        form="external-form"
      />
      <form id="external-form">
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

render(ExternalForm);
