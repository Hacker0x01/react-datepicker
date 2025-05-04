const configureFloatingUIS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      popperClassName="some-custom-class"
      popperPlacement="top-end"
      popperModifiers={[
        {
          name: "myModifier",
          fn(state: MiddlewareState) {
            // Do something with the state
            return state;
          },
        },
      ]}
    />
  );
};

render(<Example />);
`;

export default configureFloatingUIS;
