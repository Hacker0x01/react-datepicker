import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";

export const popperPlacementPositions = [
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
        <Popper modifiers={popperModifiers} placement={popperPlacement}>
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

    return (
        <Manager>
          <Reference>
            {({ ref }) => (
              <div ref={ref} className="react-datepicker-wrapper">
                {targetComponent}
              </div>
            )}
          </Reference>
          {popper}
        </Manager>
    );
  }
}
