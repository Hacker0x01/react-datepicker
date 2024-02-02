import React from "react";
import {
  useFloating,
  arrow,
  offset,
  flip,
  autoUpdate,
} from "@floating-ui/react";
import PropTypes from "prop-types";

export const popperPlacementPositions = [
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end",
  "top",
  "right",
  "bottom",
  "left",
];

export default function withFloating(Component) {
  const WithFloating = (props) => {
    const alt_props = {
      ...props,
      popperModifiers: props.popperModifiers || [],
      popperProps: props.popperProps || {},
      hidePopper:
        typeof props.hidePopper === "boolean" ? props.hidePopper : true,
    };
    const arrowRef = React.useRef();
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

  WithFloating.propTypes = {
    popperPlacement: PropTypes.oneOf(popperPlacementPositions),
    popperModifiers: PropTypes.arrayOf(PropTypes.object),
    popperProps: PropTypes.object,
    hidePopper: PropTypes.bool,
  };

  return WithFloating;
}
