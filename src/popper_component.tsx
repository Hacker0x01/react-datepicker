import { FloatingArrow } from "@floating-ui/react";
import { clsx } from "clsx";
import React, { createElement, Component } from "react";

import Portal from "./portal";
import TabLoop from "./tab_loop";
import withFloating from "./with_floating";

import type { FloatingProps } from "./with_floating";
import type { ReactNode } from "react";

interface PortalProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Portal>, "children"> {}
interface TabLoopProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabLoop>, "children"> {}

interface PopperComponentProps
  extends Omit<PortalProps, "portalId">,
    TabLoopProps,
    FloatingProps {
  className?: string;
  wrapperClassName?: string;
  popperComponent: React.ReactNode;
  popperContainer?: React.FC<{ children?: ReactNode | undefined }>;
  targetComponent: React.ReactNode;
  popperOnKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  showArrow?: boolean;
  portalId?: PortalProps["portalId"];
}

// Exported for testing purposes
export class PopperComponent extends Component<PopperComponentProps> {
  static get defaultProps() {
    return {
      hidePopper: true,
    };
  }

  render(): React.ReactElement {
    const {
      className,
      wrapperClassName,
      hidePopper = PopperComponent.defaultProps.hidePopper,
      popperComponent,
      targetComponent,
      enableTabLoop,
      popperOnKeyDown,
      portalId,
      portalHost,
      popperProps,
      showArrow,
    } = this.props;

    let popper: React.ReactElement | undefined = undefined;

    if (!hidePopper) {
      const classes = clsx("react-datepicker-popper", className);
      popper = (
        <TabLoop enableTabLoop={enableTabLoop}>
          <div
            ref={popperProps.refs.setFloating}
            style={popperProps.floatingStyles}
            className={classes}
            data-placement={popperProps.placement}
            onKeyDown={popperOnKeyDown}
          >
            {popperComponent}
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
      popper = createElement(this.props.popperContainer, {}, popper);
    }

    if (portalId && !hidePopper) {
      popper = (
        <Portal portalId={portalId} portalHost={portalHost}>
          {popper}
        </Portal>
      );
    }

    const wrapperClasses = clsx("react-datepicker-wrapper", wrapperClassName);

    return (
      <>
        <div ref={popperProps.refs.setReference} className={wrapperClasses}>
          {targetComponent}
        </div>
        {popper}
      </>
    );
  }
}

export default withFloating<PopperComponentProps>(PopperComponent);
