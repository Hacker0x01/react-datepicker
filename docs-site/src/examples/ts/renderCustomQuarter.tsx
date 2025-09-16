const RenderCustomQuarter = () => {
  const renderQuarterContent = (
    quarter: number,
    shortQuarter: string,
  ): React.ReactNode => {
    const tooltipText = `Tooltip for quarter: ${quarter}`;

    return <span title={tooltipText}>{shortQuarter}</span>;
  };

  return (
    <DatePicker
      selected={new Date()}
      renderQuarterContent={renderQuarterContent}
      showQuarterYearPicker
      dateFormat="yyyy, QQQ"
    />
  );
};

render(RenderCustomQuarter);
