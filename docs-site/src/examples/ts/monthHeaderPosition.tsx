type Position = "top" | "middle" | "bottom";

const MonthHeaderPositionExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [position, setPosition] = useState<Position>("middle");

  return (
    <>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <label>
          <input
            type="radio"
            value="top"
            checked={position === "top"}
            onChange={(e) => setPosition(e.target.value as Position)}
          />
          Top (default)
        </label>
        <label>
          <input
            type="radio"
            value="middle"
            checked={position === "middle"}
            onChange={(e) => setPosition(e.target.value as Position)}
          />
          Middle
        </label>
        <label>
          <input
            type="radio"
            value="bottom"
            checked={position === "bottom"}
            onChange={(e) => setPosition(e.target.value as Position)}
          />
          Bottom
        </label>
      </div>
      <DatePicker
        selected={selectedDate}
        onChange={setSelectedDate}
        monthHeaderPosition={position}
      />
    </>
  );
};

render(MonthHeaderPositionExample);
