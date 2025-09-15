const InlineVisible = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: Date | null) => {
    setIsOpen(!isOpen);
    setSelectedDate(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="example-custom-input" onClick={handleClick}>
        {DateFNS.format(selectedDate, "dd-MM-yyyy")}
      </button>
      {isOpen && (
        <DatePicker selected={selectedDate} onChange={handleChange} inline />
      )}
    </>
  );
};

render(InlineVisible);
