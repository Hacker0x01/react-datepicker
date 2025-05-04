const rawChangeTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleChangeRaw = (value: string) => {
    if (value === "tomorrow") {
      setStartDate(addDays(new Date(), 1));
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      placeholderText='Enter "tomorrow"'
      onChangeRaw={(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => handleChangeRaw(event.target.value)}
    />
  );
};

render(<Example />);
`;

export default rawChangeTS;
