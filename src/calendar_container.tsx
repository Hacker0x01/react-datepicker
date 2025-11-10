import React, { type HTMLAttributes } from "react";

export interface CalendarContainerProps
  extends React.PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  showTimeSelectOnly?: boolean;
  showTime?: boolean;
  inline?: boolean;
}

const CalendarContainer: React.FC<CalendarContainerProps> = function ({
  showTimeSelectOnly = false,
  showTime = false,
  className,
  children,
  inline,
}: CalendarContainerProps) {
  const ariaLabel = showTimeSelectOnly
    ? "Choose Time"
    : `Choose Date${showTime ? " and Time" : ""}`;

  return (
    <div
      className={className}
      aria-label={ariaLabel}
      role={inline ? undefined : "dialog"}
      aria-modal={inline ? undefined : "true"}
    >
      {children}
    </div>
  );
};

export default CalendarContainer;
