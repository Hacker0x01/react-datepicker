const RenderCustomHeaderTwoMonths = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const monthsShown = useMemo(() => 2, []);

  const renderHeader = ({
    monthDate,
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
  }: ReactDatePickerCustomHeaderProps) => (
    <div>
      <button
        aria-label="Previous Month"
        className={
          "react-datepicker__navigation react-datepicker__navigation--previous"
        }
        onClick={decreaseMonth}
        style={{ visibility: customHeaderCount === 0 ? "visible" : "hidden" }}
      >
        <span
          className={
            "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
          }
        >
          {"<"}
        </span>
      </button>
      <span className="react-datepicker__current-month">
        {monthDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </span>
      <button
        aria-label="Next Month"
        className={
          "react-datepicker__navigation react-datepicker__navigation--next"
        }
        onClick={increaseMonth}
        style={{
          visibility:
            customHeaderCount === monthsShown - 1 ? "visible" : "hidden",
        }}
      >
        <span
          className={
            "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
          }
        >
          {">"}
        </span>
      </button>
    </div>
  );

  return (
    <DatePicker
      renderCustomHeader={renderHeader}
      selected={selectedDate}
      onChange={setSelectedDate}
      monthsShown={monthsShown}
    />
  );
};

render(RenderCustomHeaderTwoMonths);
