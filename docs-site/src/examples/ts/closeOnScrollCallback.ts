const closeOnScrollCallbackTS = `
const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      closeOnScroll={(e: Event): boolean => e.target === document}
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
    />
  );
};

render(<Example />);
`;

export default closeOnScrollCallbackTS;
