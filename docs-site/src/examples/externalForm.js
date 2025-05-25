() => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        required
        form="external-form"
      />
      <form id="external-form">
        <input type="submit" />
      </form>
    </>
  );
};
