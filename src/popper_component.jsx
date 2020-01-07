import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper, placements } from "react-popper";

export const popperPlacementPositions = placements;

export default class PopperComponent extends React.Component {
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
      popperProps: {},
      popperPlacement: "bottom-start"
    };
  }

  static propTypes = {
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    hidePopper: PropTypes.bool,
    popperComponent: PropTypes.element,
    popperModifiers: PropTypes.object, // <datepicker/> props
    popperPlacement: PropTypes.oneOf(popperPlacementPositions), // <datepicker/> props
    popperContainer: PropTypes.func,
    popperProps: PropTypes.object,
    targetComponent: PropTypes.element
  };

  render() {
    const {
      className,
      wrapperClassName,
      hidePopper,
      popperComponent,
      popperModifiers,
      popperPlacement,
      popperProps,
      targetComponent
    } = this.props;

    let popper;

    if (!hidePopper) {
      const classes = classnames("react-datepicker-popper", className);
      popper = (
        <Popper
          modifiers={popperModifiers}
          placement={popperPlacement}
          {...popperProps}
        >
          {({ ref, style, placement, arrowProps }) => (
            <div
              {...{ ref, style }}
              className={classes}
              data-placement={placement}
            >
              {React.cloneElement(popperComponent, { arrowProps })}
            </div>
          )}
        </Popper>
      );
    }

    if (this.props.popperContainer) {
      popper = React.createElement(this.props.popperContainer, {}, popper);
    }

    const wrapperClasses = classnames(
      "react-datepicker-wrapper",
      wrapperClassName
    );

    return (
      <Manager className="react-datepicker-manager">
        <Reference>
          {({ ref }) => (
            <div ref={ref} className={wrapperClasses}>
              {targetComponent}
            </div>
          )}
        </Reference>
        {popper}
      </Manager>
    );
  }
}
