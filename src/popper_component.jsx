import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { FloatingArrow } from "@floating-ui/react";
import TabLoop from "./tab_loop";
import Portal from "./portal";
import withFloating from "./with_floating";

// Exported for testing purposes
export class PopperComponent extends React.Component {
  static get defaultProps() {
    return {
      hidePopper: true,
    };
  }

  static propTypes = {
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    hidePopper: PropTypes.bool,
    popperComponent: PropTypes.element,
    popperContainer: PropTypes.func,
    popperProps: PropTypes.object,
    targetComponent: PropTypes.element,
    enableTabLoop: PropTypes.bool,
    popperOnKeyDown: PropTypes.func,
    showArrow: PropTypes.bool,
    portalId: PropTypes.string,
    portalHost: PropTypes.instanceOf(ShadowRoot),
  };

  render() {
    const {
      className,
      wrapperClassName,
      hidePopper,
      popperComponent,
      targetComponent,
      enableTabLoop,
      popperOnKeyDown,
      portalId,
      portalHost,
      popperProps,
      showArrow,
    } = this.props;

    let popper;

    if (!hidePopper) {
      const classes = classnames("react-datepicker-popper", className);
      popper = (
        <TabLoop enableTabLoop={enableTabLoop}>
          <div
            ref={popperProps.refs.setFloating}
            style={popperProps.floatingStyles}
            className={classes}
            data-placement={popperProps.placement}
            onKeyDown={popperOnKeyDown}
          >
            {React.cloneElement(popperComponent)}
            {showArrow && (
              <FloatingArrow
                ref={popperProps.arrowRef}
                context={popperProps.context}
                fill="currentColor"
                strokeWidth={1}
                height={8}
                width={16}
                style={{ transform: "translateY(-1px)" }}
                className="react-datepicker__triangle"
              />
            )}
          </div>
        </TabLoop>
      );
    }

    if (this.props.popperContainer) {
      popper = React.createElement(this.props.popperContainer, {}, popper);
    }

    if (portalId && !hidePopper) {
      popper = (
        <Portal portalId={portalId} portalHost={portalHost}>
          {popper}
        </Portal>
      );
    }

    const wrapperClasses = classnames(
      "react-datepicker-wrapper",
      wrapperClassName,
    );

    return (
      <React.Fragment>
        <div ref={popperProps.refs.setReference} className={wrapperClasses}>
          {targetComponent}
        </div>
        {popper}
      </React.Fragment>
    );
  }
}

export default withFloating(PopperComponent);
