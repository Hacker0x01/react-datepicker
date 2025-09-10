interface ExampleCustomTimeInputProps {
  date?: Date;
  value: string;
  onChange: (time: string) => void;
}

const CustomTimeInput = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const ExampleCustomTimeInput = ({
    value,
    onChange,
  }: ExampleCustomTimeInputProps) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.target?.focus()}
      style={{ border: "solid 1px pink" }}
    />
  );

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      showTimeInput
      customTimeInput={<ExampleCustomTimeInput />}
    />
  );
};

render(CustomTimeInput);
