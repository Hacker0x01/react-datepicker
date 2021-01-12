import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper, placements } from "react-popper";
import TabLoop from "./tab_loop";
import Portal from "./portal";

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
    targetComponent: PropTypes.element,
    enableTabLoop: PropTypes.bool,
    popperOnKeyDown: PropTypes.func,
    portalId: PropTypes.string
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
      targetComponent,
      enableTabLoop,
      popperOnKeyDown,
      portalId
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
            <TabLoop enableTabLoop={enableTabLoop}>
              <div
                {...{ ref, style }}
                className={classes}
                data-placement={placement}
                onKeyDown={popperOnKeyDown}
              >
                {React.cloneElement(popperComponent, { arrowProps })}
              </div>
            </TabLoop>
          )}
        </Popper>
      );
    }

    if (this.props.popperContainer) {
      popper = React.createElement(this.props.popperContainer, {}, popper);
    }

    if (portalId && !hidePopper) {
      popper = <Portal portalId={portalId}>{popper}</Portal>;
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
