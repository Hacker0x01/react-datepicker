import React from "react";
import PropTypes from "prop-types";
import { clsx } from "clsx";

const TestWrapper = ({ className, children }) => (
  <div className={clsx("test-wrapper", className)}>{children}</div>
);

TestWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default TestWrapper;
