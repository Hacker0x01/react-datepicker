import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { Manager, Target, Popper } from "react-popper";

export const popperPlacementPositions = [
  "auto",
  "auto-left",
  "auto-right",
  "bottom",
  "bottom-end",
  "bottom-start",
  "left",
  "left-end",
  "left-start",
  "right",
  "right-end",
  "right-start",
  "top",
  "top-end",
  "top-start"
];

export default class PopperComponent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    hidePopper: PropTypes.bool,
    popperComponent: PropTypes.element,
    popperModifiers: PropTypes.object, // <datepicker/> props
    popperPlacement: PropTypes.oneOf(popperPlacementPositions), // <datepicker/> props
    popperContainer: PropTypes.func,
    targetComponent: PropTypes.element
  };

  static get defaultProps() {
    return {
      hidePopper: true,
      popperModifiers: {
        preventOverflow: {
          enabled: true,
          escapeWithReference: true,
          boundariesElement: "viewport"
        }
      },
      popperPlacement: "bottom-start"
    };
  }

  render() {
    const {
      className,
      hidePopper,
      popperComponent,
      popperModifiers,
      popperPlacement,
      targetComponent
    } = this.props;

    let popper;

    if (!hidePopper) {
      const classes = classnames("react-datepicker-popper", className);
      popper = (
        <Popper
          className={classes}
          modifiers={popperModifiers}
          placement={popperPlacement}
        >
          {popperComponent}
        </Popper>
      );
    }

    if (this.props.popperContainer) {
      popper = React.createElement(this.props.popperContainer, {}, popper);
    }

    return (
      <Manager>
        <Target className="react-datepicker-wrapper">{targetComponent}</Target>
        {popper}
      </Manager>
    );
  }
}
