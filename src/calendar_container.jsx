import PropTypes from "prop-types";
import React from "react";

export default function CalendarContainer({ className, children }) {
  return (
    <div className={className} role="dialog" aria-label="Choose Date" aria-modal="true">
      {children}
    </div>
  );
}

CalendarContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
