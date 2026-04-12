// undefined falls back to the browser's default locale
const formatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const IntlDateFormat = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      formatDateDisplay={(date) => formatter.format(date)}
      selected={selectedDate}
      onChange={setSelectedDate}
    />
  );
};

render(IntlDateFormat);
