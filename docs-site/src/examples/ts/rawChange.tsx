const RawChange = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleChangeRaw = (value: string) => {
    if (value === "tomorrow") {
      setStartDate(DateFNS.addDays(new Date(), 1));
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
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
