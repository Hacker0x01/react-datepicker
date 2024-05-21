import {
  useFloating,
  arrow,
  offset,
  flip,
  autoUpdate,
  type UseFloatingOptions,
  type ReferenceType,
  type Middleware,
  type Placement,
} from "@floating-ui/react";
import React, { useRef } from "react";

export interface WithFloatingProps {
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
export default function withFloating<
  T extends object,
  RT extends ReferenceType = ReferenceType,
>(Component: React.ComponentType<T>) {
  const WithFloating: React.FC<T & WithFloatingProps> = (
    props,
  ): JSX.Element => {
    const alt_props = {
      ...props,
      popperModifiers: props.popperModifiers ?? [],
      popperProps: props.popperProps ?? {},
      hidePopper:
        typeof props.hidePopper === "boolean" ? props.hidePopper : true,
    };
    const arrowRef: React.RefObject<HTMLElement> = useRef(null);
    const floatingProps = useFloating<RT>({
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
