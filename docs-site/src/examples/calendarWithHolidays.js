() => {
  const [startDate, setStartDate] = useState(new Date());
  const renderDayContents = (day, date, name) => {
    const tooltipText = name
      ? `Tooltip for date: ${name}`
      : `Tooltip for date: ${date}`;
    return <span title={tooltipText}>{getDate(date)}</span>;
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      holidayDates={[
        { date: new Date("08/08/2023"), name: "Tendong Lho Rum Faat" },
        { date: new Date("08/15/2023"), name: "Independence Day" },
        { date: new Date("08/16/2023"), name: "Parsi New Year" },
        { date: new Date("08/28/2023"), name: "First Onam" },
        { date: new Date("08/29/2023"), name: "Thiruvonam" },
      ]}
      placeholderText="This highlights a week ago and a week from today"
      renderDayContents={renderDayContents}
    />
  );
};
