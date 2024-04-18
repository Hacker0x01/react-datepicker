import React from "react";

interface CalendarContainerProps {
  showTimeSelectOnly?: boolean;
  showTime?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function CalendarContainer({
  showTimeSelectOnly = false,
  showTime = false,
  className,
  children,
}: Readonly<CalendarContainerProps>) {
  let ariaLabel = showTimeSelectOnly
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
}
