import React, { ComponentType } from "react";
import {
  useFloating,
  arrow,
  offset,
  flip,
  autoUpdate,
  Middleware,
  Placement,
  type UseFloatingOptions,
} from "@floating-ui/react";

interface WithFloatingProps {
  popperModifiers?: Middleware[];
  popperProps?: Omit<UseFloatingOptions, "middleware">;
  hidePopper?: boolean;
  popperPlacement?: Placement;
}

/**
 * `withFloating` is a higher-order component that adds floating behavior to a component.
 *
 * @param Component - The component to enhance.
 *
 * @example
 * const FloatingComponent = withFloating(MyComponent);
 * <FloatingComponent popperModifiers={[]} popperProps={{}} hidePopper={true} />
 *
 * @param popperModifiers - The modifiers to use for the popper.
 * @param popperProps - The props to pass to the popper.
 * @param hidePopper - Whether to hide the popper.
 * @param popperPlacement - The placement of the popper.
 *
 * @returns A new component with floating behavior.
 */
export default function withFloating<T extends {}>(
  Component: ComponentType<T>,
) {
  const WithFloating: React.FC<T & WithFloatingProps> = (props) => {
    const alt_props = {
      ...props,
      popperModifiers: props.popperModifiers ?? [],
      popperProps: props.popperProps ?? {},
      hidePopper:
        typeof props.hidePopper === "boolean" ? props.hidePopper : true,
    };
    const arrowRef: React.RefObject<HTMLElement> = React.useRef(null);
    const floatingProps = useFloating({
      open: !alt_props.hidePopper,
      whileElementsMounted: autoUpdate,
      placement: alt_props.popperPlacement,
      middleware: [
        flip({ padding: 15 }),
        offset(10),
        arrow({ element: arrowRef }),
        ...alt_props.popperModifiers,
      ],
      ...alt_props.popperProps,
    });

    return (
      <Component {...alt_props} popperProps={{ ...floatingProps, arrowRef }} />
    );
  };

  return WithFloating;
}
