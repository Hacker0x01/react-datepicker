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
    const arrowRef = React.useRef();
    const floatingProps = useFloating({
      whileElementsMounted: autoUpdate,
      placement: props.popperPlacement,
      middleware: [
        flip({ padding: 15 }),
        offset(10),
        arrow({ element: arrowRef }),
        ...props.popperModifiers,
      ],
      ...props.popperProps,
    });

    return (
      <Component {...props} popperProps={{ ...floatingProps, arrowRef }} />
    );
  };

  WithFloating.propTypes = {
    popperPlacement: PropTypes.oneOf(popperPlacementPositions),
    popperModifiers: PropTypes.arrayOf(PropTypes.object),
    popperProps: PropTypes.object,
  };

  WithFloating.defaultProps = {
    popperModifiers: [],
    popperProps: {},
  };

  return WithFloating;
}
