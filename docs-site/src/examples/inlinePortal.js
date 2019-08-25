() => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = e => {
    setIsOpen(!isOpen);
  };
  const handleClick = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className="example-custom-input" onClick={handleClick}>
        {format(startDate, "dd-MM-yyyy")}
      </button>
      {isOpen && (
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          withPortal
          inline
        />
      )}
    </>
  );
};
