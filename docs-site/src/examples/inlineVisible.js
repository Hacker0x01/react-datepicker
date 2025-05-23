() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setSelectedDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className="example-custom-input" onClick={handleClick}>
        {format(selectedDate, "dd-MM-yyyy")}
      </button>
      {isOpen && (
        <DatePicker selected={selectedDate} onChange={handleChange} inline />
      )}
    </>
  );
};
