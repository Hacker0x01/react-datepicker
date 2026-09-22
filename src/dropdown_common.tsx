import React from "react";

export type DropdownKind = "year" | "month" | "month-year";

interface DropdownReadViewProps {
  kind: DropdownKind;
  visible: boolean;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

/**
 * Shared "collapsed" toggle button for scroll-mode year/month/month-year
 * dropdowns: a `<button>` (not a `<div>`) so it's reachable via Tab and
 * responds to Enter/Space, plus a down-arrow decoration and the currently
 * selected value.
 */
export const DropdownReadView = ({
  kind,
  visible,
  onClick,
  children,
}: DropdownReadViewProps): React.ReactElement => {
  const readViewClassName = `react-datepicker__${kind}-read-view`;

  return (
    <button
      type="button"
      style={{ visibility: visible ? "visible" : "hidden" }}
      className={readViewClassName}
      onClick={onClick}
    >
      <span className={`${readViewClassName}--down-arrow`} />
      <span className={`${readViewClassName}--selected-${kind}`}>
        {children}
      </span>
    </button>
  );
};

export const dropdownContainerClassName = (
  kind: DropdownKind,
  dropdownMode: "scroll" | "select",
): string =>
  `react-datepicker__${kind}-dropdown-container react-datepicker__${kind}-dropdown-container--${dropdownMode}`;

/**
 * Scroll-mode dropdowns render just the read view, or the read view plus the
 * options list in front of it once opened — identical across all three
 * dropdown kinds.
 */
export const renderScrollModeChildren = (
  readView: React.ReactElement,
  dropdownVisible: boolean,
  dropdown: React.ReactElement,
): React.ReactElement[] => {
  const result = [readView];
  if (dropdownVisible) {
    result.unshift(dropdown);
  }
  return result;
};
