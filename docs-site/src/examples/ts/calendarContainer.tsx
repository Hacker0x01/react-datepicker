const CustomCalendarContainer = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const MyContainer = ({
    className,
    children,
  }: {
    className: string;
    children: ReactNode;
  }) => {
    return (
      <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
        <CalendarContainer className={className}>
          <div style={{ background: "#f0f0f0" }}>
            What is your favorite day?
          </div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      calendarContainer={MyContainer}
    />
  );
};

render(CustomCalendarContainer);
