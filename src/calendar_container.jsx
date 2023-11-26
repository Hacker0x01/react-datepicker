import PropTypes from "prop-types";
import React from "react";

export default function CalendarContainer({ className, children }) {
  return <div className={className}>{children}</div>;
}

CalendarContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
