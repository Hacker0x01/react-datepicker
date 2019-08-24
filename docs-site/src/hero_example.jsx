import React, { useState } from "react";
import DatePicker from "react-datepicker";

const HeroExample = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      autoFocus
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
  );
};

export default HeroExample;
