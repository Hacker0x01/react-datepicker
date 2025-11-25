const ExternalForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={setSelectedDate}
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
