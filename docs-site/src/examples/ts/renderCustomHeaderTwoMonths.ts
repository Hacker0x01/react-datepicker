const renderCustomHeaderTwoMonthsTS = `

const CustomHeader = ({
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
      style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
      onClick={decreaseMonth}
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
      style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
      onClick={increaseMonth}
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

const Example = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      renderCustomHeader={CustomHeader}
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      monthsShown={2}
    />
  );
};

render(<Example />);
`;

export default renderCustomHeaderTwoMonthsTS;
