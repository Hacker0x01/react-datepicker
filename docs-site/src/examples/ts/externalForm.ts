const externalFormTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        required
        form="external-form"
      />
      <form id="external-form">
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

render(<Example />);
`;

export default externalFormTS;
