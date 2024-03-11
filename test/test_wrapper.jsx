import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TestWrapper = ({ className, children }) => (
  <div className={classNames("test-wrapper", className)}>{children}</div>
);

TestWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default TestWrapper;
