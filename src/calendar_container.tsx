import React from "react";

export interface CalendarContainerProps extends React.PropsWithChildren {
  showTimeSelectOnly?: boolean;
  showTime?: boolean;
  className?: string;
}

const CalendarContainer: React.FC<CalendarContainerProps> = function ({
  showTimeSelectOnly = false,
  showTime = false,
  className,
  children,
}: CalendarContainerProps) {
  const ariaLabel = showTimeSelectOnly
    ? "Choose Time"
    : `Choose Date${showTime ? " and Time" : ""}`;

  return (
    <div
      className={className}
      role="dialog"
      aria-label={ariaLabel}
      aria-modal="true"
    >
      {children}
    </div>
  );
};

export default CalendarContainer;
