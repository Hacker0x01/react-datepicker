import React from "react";
import PropTypes from "prop-types";

var TestWrapper = ({ children }) => (
  <div className="test-wrapper">{children}</div>
);

TestWrapper.propTypes = {
  children: PropTypes.node
};

export default TestWrapper;
