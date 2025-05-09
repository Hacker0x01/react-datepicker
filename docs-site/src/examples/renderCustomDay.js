() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const renderDayContents = (day, date) => {
    const tooltipText = `Tooltip for date: ${date}`;
    return <span title={tooltipText}>{getDate(date)}</span>;
  };
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      renderDayContents={renderDayContents}
    />
  );
};
