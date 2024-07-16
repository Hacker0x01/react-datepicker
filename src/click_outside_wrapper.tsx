import React, { useCallback, useEffect, useRef } from "react";

export type ClickOutsideHandler = (event: MouseEvent) => void;

interface ClickOutsideWrapperProps {
  onClickOutside: ClickOutsideHandler;
  className?: string;
  children: React.ReactNode;
  containerRef?: React.MutableRefObject<HTMLDivElement | null>;
  style?: React.CSSProperties;
  ignoreClass?: string;
}

const useDetectClickOutside = (
  onClickOutside: ClickOutsideHandler,
  ignoreClass?: string,
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const onClickOutsideRef = useRef(onClickOutside);
  onClickOutsideRef.current = onClickOutside;
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (
          !(
            ignoreClass &&
            event.target instanceof HTMLElement &&
            event.target.classList.contains(ignoreClass)
          )
        ) {
          onClickOutsideRef.current?.(event);
        }
      }
    },
    [ignoreClass],
  );
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  return ref;
};

export const ClickOutsideWrapper: React.FC<ClickOutsideWrapperProps> = ({
  children,
  onClickOutside,
  className,
  containerRef,
  style,
  ignoreClass,
}) => {
  const detectRef = useDetectClickOutside(onClickOutside, ignoreClass);
  return (
    <div
      className={className}
      style={style}
      ref={(node: HTMLDivElement | null) => {
        detectRef.current = node;
        if (containerRef) {
          containerRef.current = node;
        }
      }}
    >
      {children}
    </div>
  );
};
