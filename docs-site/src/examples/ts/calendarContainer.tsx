const CustomCalendarContainer = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

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
      selected={selectedDate}
      onChange={setSelectedDate}
      calendarContainer={MyContainer}
    />
  );
};

render(CustomCalendarContainer);
