() => {
  const renderQuarterContent = (quarter, shortQuarter) => {
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
