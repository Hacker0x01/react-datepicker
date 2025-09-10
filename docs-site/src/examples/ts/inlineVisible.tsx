const InlineVisible = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: Date | null) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="example-custom-input" onClick={handleClick}>
        {format(startDate, "dd-MM-yyyy")}
      </button>
      {isOpen && (
        <DatePicker selected={startDate} onChange={handleChange} inline />
      )}
    </>
  );
};

render(InlineVisible);
