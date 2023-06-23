() => {
  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };
  return (
    <DatePicker
      selected={new Date()}
      renderYearContent={renderYearContent}
      showYearPicker
      dateFormat="yyyy"
    />
  );
};
