type ExampleCustomInputProps = {
  className?: string;
  value?: string;
  onClick?: () => void;
};

const ExampleCustomInput = forwardRef<
  HTMLButtonElement,
  ExampleCustomInputProps
>(({ value, onClick, className }, ref) => (
  <button type="button" className={className} onClick={onClick} ref={ref}>
    {value}
  </button>
));
ExampleCustomInput.displayName = "ExampleCustomInput";

const CustomInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      customInput={<ExampleCustomInput className="example-custom-input" />}
    />
  );
};

render(CustomInput);
