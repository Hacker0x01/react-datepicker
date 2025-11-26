const WithPortalById = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      withPortal
      portalId="root-portal"
    />
  );
};

render(WithPortalById);
