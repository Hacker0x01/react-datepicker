import PropTypes from "prop-types";
import React from "react";

export default function CalendarContainer({
  showTimeSelectOnly = false,
  showTime = false,
  className,
  children,
}) {
  let ariaLabel = showTimeSelectOnly
    ? "Choose Time"
    : `Choose Date${showTime ? " and Time" : ""}`;

  return (
    <div
      className={className}
      role="dialog"
      aria-label={ariaLabel}
      aria-modal="true"
    >
      {children}
    </div>
  );
}

CalendarContainer.propTypes = {
  showTimeSelectOnly: PropTypes.bool,
  showTime: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
