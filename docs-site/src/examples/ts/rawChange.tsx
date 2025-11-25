interface SelectedDateMeta {
  date: Date;
  formattedDate: string;
}

const RawChange = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChangeRaw = (
    event:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLElement>
      | React.ChangeEvent<HTMLInputElement>,
    selectedDateMeta?: SelectedDateMeta | null,
  ) => {
    if (event.target instanceof HTMLInputElement) {
      const value = event.target.value;

      console.log(
        selectedDateMeta
          ? `Selected Date Meta: ${JSON.stringify(selectedDateMeta)}`
          : "No Selection Meta is available",
      );

      if (value === "tomorrow") {
        setSelectedDate(DateFNS.addDays(new Date(), 1));
      }
    }
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      placeholderText='Enter "tomorrow"'
      onChangeRaw={handleChangeRaw}
    />
  );
};

render(RawChange);
