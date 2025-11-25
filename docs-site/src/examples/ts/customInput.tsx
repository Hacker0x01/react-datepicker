type ExampleCustomInputProps = {
  className?: string;
  value?: string;
  onClick?: () => void;
};

const CustomInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    ExampleCustomInputProps
  >(({ value, onClick, className }, ref) => (
    <button className={className} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      customInput={<ExampleCustomInput className="example-custom-input" />}
    />
  );
};

render(CustomInput);
