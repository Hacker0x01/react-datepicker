() => {
  const [startDate, setStartDate] = useState(new Date());

  const holidaysList = [
    { day: "2023-08-12", reason: "Saturday Off" },
    { day: "2023-08-22", reason: "Birthday Celebration" },
    { day: "2023-09-13", reason: "September Holiday" },
    { day: "2024-01-01", reason: "New Year off" },
    { day: "2022-12-31", reason: "End Year off" },
  ];

  const holidays = holidaysList.map((date) => {
    return new Date(date.day).toDateString();
  });

  const renderDayContents = (day, date) => {
    const overlayContent = holidaysList.find((items, index) => {
      if (holidays[index] === date.toDateString()) {
        return items;
      }
    });
    return (
      <span>
        {getDate(date)}
        {overlayContent && (
          <span className="holiday-overlay">{overlayContent.reason} </span>
        )}
      </span>
    );
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dayClassName={(date) =>
        holidays.includes(date.toDateString()) ? "highlight-holiday" : undefined
      }
      renderDayContents={renderDayContents}
    />
  );
};
