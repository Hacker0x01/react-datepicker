const RenderCustomDay = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const renderDayContents = (day: number, date: Date): React.ReactNode => {
    const tooltipText = `Tooltip for date: ${date}`;

    return <span title={tooltipText}>{DateFNS.getDate(date)}</span>;
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      renderDayContents={renderDayContents}
    />
  );
};

render(RenderCustomDay);
