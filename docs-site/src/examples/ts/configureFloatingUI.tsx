const ConfigureFloatingUI = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      popperClassName="some-custom-class"
      popperPlacement="top-end"
      popperModifiers={[
        {
          name: "myModifier",
          fn(state: MiddlewareState) {
            // Do something with the state
            return state;
          },
        },
      ]}
    />
  );
};

render(ConfigureFloatingUI);
