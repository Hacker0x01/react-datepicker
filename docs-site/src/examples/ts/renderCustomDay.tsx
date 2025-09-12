const RenderCustomDay = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const renderDayContents = (day: number, date: Date): React.ReactNode => {
    const tooltipText = `Tooltip for date: ${date}`;

    return <span title={tooltipText}>{DateFNS.getDate(date)}</span>;
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      renderDayContents={renderDayContents}
    />
  );
};

render(RenderCustomDay);
