import { clsx } from "clsx";
import React, { createElement, Component } from "react";
import { FloatingArrow } from "@floating-ui/react";
import type { ReferenceType, UseFloatingReturn } from "@floating-ui/react";
import TabLoop from "./tab_loop";
import Portal from "./portal";
import withFloating from "./with_floating";

interface PortalProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Portal>, "children"> {}
interface TabLoopProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabLoop>, "children"> {}

interface PopperComponentProps<RT extends ReferenceType = ReferenceType>
  extends PortalProps,
    TabLoopProps {
  className?: string;
  wrapperClassName?: string;
  hidePopper?: boolean;
  popperComponent: React.ReactNode;
  popperContainer?: React.FC<React.PropsWithChildren>;
  popperProps: UseFloatingReturn<RT> & {
    arrowRef: React.RefObject<SVGSVGElement>;
  };
  targetComponent: React.ReactNode;
  popperOnKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  showArrow?: boolean;
}

// Exported for testing purposes
export class PopperComponent<
  RT extends ReferenceType = ReferenceType,
> extends Component<PopperComponentProps<RT>> {
  static get defaultProps(): Partial<PopperComponentProps> {
    return {
      hidePopper: true,
    };
  }

  render(): JSX.Element {
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

    let popper: JSX.Element | undefined = undefined;

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
