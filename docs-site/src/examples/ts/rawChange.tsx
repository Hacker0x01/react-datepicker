const RawChange = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChangeRaw = (value: string) => {
    if (value === "tomorrow") {
      setSelectedDate(DateFNS.addDays(new Date(), 1));
    }
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      placeholderText='Enter "tomorrow"'
      onChangeRaw={(
        event:
          | React.MouseEvent<HTMLElement>
          | React.KeyboardEvent<HTMLElement>
          | React.ChangeEvent<HTMLInputElement>,
      ) => {
        if (event.target instanceof HTMLInputElement) {
          handleChangeRaw(event.target.value);
        }
      }}
    />
  );
};

render(RawChange);
