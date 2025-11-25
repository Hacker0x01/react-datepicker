const { isValid, format } = DateFNS;

const OnBlurCallbacks = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleOnBlur = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) => {
    const date = new Date(value);
    if (isValid(date)) {
      console.log("date: %s", format(date, "dd/MM/yyyy"));
    } else {
      console.log("value: %s", date);
    }
  };

  return (
    <DatePicker
      key="example9"
      selected={selectedDate}
      onChange={setSelectedDate}
      onBlur={handleOnBlur}
      placeholderText="View blur callbacks in console"
    />
  );
};

render(OnBlurCallbacks);
