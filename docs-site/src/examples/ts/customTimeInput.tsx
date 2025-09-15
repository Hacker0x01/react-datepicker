interface ExampleCustomTimeInputProps {
  date?: Date;
  value?: string;
  onChange?: (time: string) => void;
}

const CustomTimeInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

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
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      showTimeInput
      customTimeInput={<ExampleCustomTimeInput />}
    />
  );
};

render(CustomTimeInput);
