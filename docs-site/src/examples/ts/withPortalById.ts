const withPortalByIdTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      withPortal
      portalId="root-portal"
    />
  );
};

render(<Example />);
`;

export default withPortalByIdTS;
