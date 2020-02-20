() => {
  const [startDate, setStartDate] = useState(new Date());
  const renderDayContents = (day, date) => {
    const tooltipText = `Tooltip for date: ${date}`;
    return <span title={tooltipText}>{getDate(date)}</span>;
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      renderDayContents={renderDayContents}
    />
  );
};
