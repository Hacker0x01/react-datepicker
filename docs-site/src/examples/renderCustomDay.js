() => {
  const [startDate, setStartDate] = useState(new Date());
  const renderDayContents = (day, date, props) => {
    const tooltipText = `Tooltip for date: ${date}${props.disabled ? ' (disabled)' : ''}`;
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
