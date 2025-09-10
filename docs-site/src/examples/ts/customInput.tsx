type ExampleCustomInputProps = {
  className?: string;
  value?: string;
  onClick?: () => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  onChange?: (
    ...args: Parameters<Required<DatePickerProps>["onChangeRaw"]>
  ) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  id?: ComponentProps<typeof DatePicker>["id"];
  name?: ComponentProps<typeof DatePicker>["name"];
  form?: ComponentProps<typeof DatePicker>["form"];
  autoFocus?: ComponentProps<typeof DatePicker>["autoFocus"];
  placeholder?: ComponentProps<typeof DatePicker>["placeholderText"];
  disabled?: ComponentProps<typeof DatePicker>["disabled"];
  autoComplete?: ComponentProps<typeof DatePicker>["autoComplete"];
  title?: ComponentProps<typeof DatePicker>["title"];
  readOnly?: ComponentProps<typeof DatePicker>["readOnly"];
  required?: ComponentProps<typeof DatePicker>["required"];
  tabIndex?: ComponentProps<typeof DatePicker>["tabIndex"];
  "aria-describedby"?: ComponentProps<typeof DatePicker>["ariaDescribedBy"];
  "aria-invalid"?: ComponentProps<typeof DatePicker>["ariaInvalid"];
  "aria-labelledby"?: ComponentProps<typeof DatePicker>["ariaLabelledBy"];
};

const CustomInput = () => {
  const [startDate, setStartDate] = useState(new Date());

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
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput className="example-custom-input" />}
    />
  );
};

render(CustomInput);
