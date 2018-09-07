import { cloneElement } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const ScreenReaderOnly = ({ children }) => {
  const classes = classNames("screenReaderOnly", children.props.className);

  const props = {
    ...children.props,
    ...{
      className: classes
    }
  };

  return cloneElement(children, props);
};

ScreenReaderOnly.propTypes = {
  children: PropTypes.node
};
