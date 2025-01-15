import {
  useFloating,
  arrow,
  offset,
  flip,
  autoUpdate,
  type UseFloatingOptions,
  type Middleware,
  type Placement,
  type UseFloatingReturn,
} from "@floating-ui/react";
import React, { useRef } from "react";

export interface FloatingProps {
  hidePopper?: boolean;
  popperProps: UseFloatingReturn & {
    arrowRef: React.RefObject<SVGSVGElement>;
  };
}

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
export default function withFloating<T extends FloatingProps>(
  Component: React.ComponentType<T>,
) {
  type R = Omit<T, "popperProps"> & WithFloatingProps;
  const WithFloating: React.FC<R> = (props): React.ReactElement => {
    const hidePopper: boolean =
      typeof props.hidePopper === "boolean" ? props.hidePopper : true;
    const arrowRef: React.RefObject<HTMLElement | null> = useRef(null);
    const floatingProps = useFloating({
      open: !hidePopper,
      whileElementsMounted: autoUpdate,
      placement: props.popperPlacement,
      middleware: [
        flip({ padding: 15 }),
        offset(10),
        arrow({ element: arrowRef }),
        ...(props.popperModifiers ?? []),
      ],
      ...props.popperProps,
    });

    const componentProps = {
      ...props,
      hidePopper,
      popperProps: { ...floatingProps, arrowRef },
    } as unknown as T;

    return <Component {...componentProps} />;
  };

  return WithFloating;
}
