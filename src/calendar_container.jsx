import PropTypes from "prop-types";
import React from "react";

export default function CalendarContainer({
  className,
  children,
  arrowProps = {},
  onPressStart = null
}) {
  return (
    <div
      className={className}
      onTouchStart={onPressStart}
      onMouseDown={onPressStart}
    >
      <div className="react-datepicker__triangle" {...arrowProps} />
      {children}
    </div>
  );
}

CalendarContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  arrowProps: PropTypes.object, // react-popper arrow props
  onPressStart: PropTypes.func
};
