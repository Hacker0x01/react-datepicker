import React from "react";
import PropTypes from "prop-types";

const CustomTimeInput = ({ onChange, onTimeChange, date, value, ...restProps }) => (
  <input
    value={value}
    onChange={e => onTimeChange ? onTimeChange(date) : onChange(e.target.value)}
    style={{ border: "solid 1px pink" }}
    {...restProps}
  />
);

CustomTimeInput.propTypes = {
  onTimeChange: PropTypes.func,
  onChange: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  value: PropTypes.string
};

export default CustomTimeInput;