interface ExampleCustomTimeInputProps {
  date?: Date;
  value?: string;
  onChange?: (time: string) => void;
}

const CustomTimeInput = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date(),
  );

  const ExampleCustomTimeInput = ({
    value,
    onChange,
  }: ExampleCustomTimeInputProps) => (
    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onClick={(e: React.MouseEvent<HTMLInputElement>) =>
        (e.target as HTMLInputElement).focus()
      }
      style={{ border: "solid 1px pink" }}
    />
  );

  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={(date: Date | null) => setSelectedDateTime(date)}
      showTimeInput
      customTimeInput={<ExampleCustomTimeInput />}
    />
  );
};

render(CustomTimeInput);
