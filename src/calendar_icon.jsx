import React from "react";
import PropTypes from "prop-types";

const CalendarIcon = ({ icon, className = "" }) => {
  const defaultClass = "react-datepicker__calendar-icon";

  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      className: `${icon.props.className || ""} ${defaultClass} ${className}`,
    });
  }

  if (typeof icon === "string") {
    return (
      <i
        className={`${defaultClass} ${icon} ${className}`}
        aria-hidden="true"
      />
    );
  }

  // Default SVG Icon
  return (
    <svg
      className={`${defaultClass} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" />
    </svg>
  );
};

CalendarIcon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};

export default CalendarIcon;
