const RenderCustomDayName = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const renderDayName = ({
    day,
    shortName,
    fullName,
    customDayNameCount,
  }: ReactDatePickerCustomDayNameProps): React.ReactNode => {
    // Example: Add emoji or custom styling to day names
    const dayEmojis: { [key: string]: string } = {
      Monday: "🌙",
      Tuesday: "🔥",
      Wednesday: "🌊",
      Thursday: "⚡",
      Friday: "🎉",
      Saturday: "🌞",
      Sunday: "☀️",
    };

    const emoji = dayEmojis[fullName] || "";

    // Apply different styling based on customDayNameCount when showing multiple months
    const style = customDayNameCount > 0 ? { color: "red" } : {};

    return (
      <>
        <span className="react-datepicker__sr-only">{fullName}</span>
        <span aria-hidden="true" title={fullName} style={style}>
          {emoji}
          <br />
          {shortName}
        </span>
      </>
    );
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      renderCustomDayName={renderDayName}
      monthsShown={2}
    />
  );
};

render(RenderCustomDayName);
