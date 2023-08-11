import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css"; // Custom CSS file

const CustomDatePicker = ({ holidayDates }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  const checkIsHoliday = (date) => {
    const isHoliday = holidayDates.some((holiday) => {
      console.log(isSameDay(holiday.date, date));
      return isSameDay(holiday.date, date);
    });
    return isHoliday;
  };

  const renderCustomDay = (date) => {
    const isSelected = selectedDate && isSameDay(selectedDate, date);

    return checkIsHoliday(date) ? "holiday" : "";
  };

  const getHolidayName = (date) => {
    const holiday = holidayDates.find((holiday) => {
      return isSameDay(holiday.date, date);
    });
    return holiday;
  };

  const renderDayContents = (day, date) => {
    const tooltipText = `${getHolidayName(date)?.name}`;
    return checkIsHoliday(date) ? (
      <span title={tooltipText}>{date.getDate()}</span>
    ) : (
      <span>{date.getDate()}</span>
    );
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dayClassName={renderCustomDay}
      dateFormat="dd/MM/yyyy"
      renderDayContents={renderDayContents}
    />
  );
};

export default CustomDatePicker;
