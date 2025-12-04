/**
 * When using a customInput with multiple elements (like a text display and a button),
 * you can use popperTargetRef to control which element the calendar positions relative to.
 *
 * Without popperTargetRef, the calendar positions relative to the wrapper div.
 * With popperTargetRef, it positions relative to the specific element you choose.
 */

type CustomInputWithButtonProps = {
  value?: string;
  onClick?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
};

const CustomInputWithButton: React.FC<CustomInputWithButtonProps> = ({
  value,
  onClick,
  buttonRef,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "250px",
    }}
  >
    <span style={{ flex: 1 }}>{value || "Select a date"}</span>
    <button
      ref={buttonRef}
      onClick={onClick}
      type="button"
      style={{
        padding: "4px 8px",
        cursor: "pointer",
      }}
    >
      📅
    </button>
  </div>
);

const PopperTargetRef = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      customInput={<CustomInputWithButton buttonRef={buttonRef} />}
      popperTargetRef={buttonRef}
    />
  );
};

render(PopperTargetRef);
