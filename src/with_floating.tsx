import React, { ComponentType } from "react";
import {
  useFloating,
  arrow,
  offset,
  flip,
  autoUpdate,
  Middleware,
  Placement,
} from "@floating-ui/react";

interface WithFloatingProps {
  popperModifiers?: Middleware[];
  popperProps?: object;
  hidePopper?: boolean;
  popperPlacement?: Placement;
}

export default function withFloating<T extends {}>(
  Component: ComponentType<T>
) {
  const WithFloating: React.FC<T & WithFloatingProps> = (props) => {
    const alt_props = {
      ...props,
      popperModifiers: props.popperModifiers || [],
      popperProps: props.popperProps || {},
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
