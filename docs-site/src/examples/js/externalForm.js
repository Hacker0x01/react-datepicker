() => {
  const [startDate, setStartDate] = useState(null);

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        required
        form="external-form"
      />
      <form id="external-form">
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
