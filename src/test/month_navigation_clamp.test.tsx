import { fireEvent } from "@testing-library/dom";
import React from "react";

import DatePicker from "index";
import { safeQuerySelector } from "./test_utils";
import { render } from "@testing-library/react";

describe("month navigation clamps to minDate/maxDate (snapback)", () => {
  const minDate = new Date(2026, 4, 24); // May 24, 2026
  const maxDate = new Date(2026, 6, 23); // July 23, 2026
  const includeDates = [new Date(2026, 4, 5), new Date(2026, 4, 30)]; // May only

  function navigateToJuly() {
    const onMonthChange = jest.fn();

    const { container } = render(
      <DatePicker
        inline
        selected={new Date(2026, 4, 5)}
        onChange={() => {}}
        minDate={minDate}
        maxDate={maxDate}
        includeDates={includeDates}
        openToDate={new Date(2026, 4, 24)}
        onMonthChange={onMonthChange}
        showMonthDropdown
        dropdownMode="scroll"
      />,
    );

    fireEvent.click(
      safeQuerySelector(container, ".react-datepicker__month-read-view"),
    );
    const july = Array.from(
      container.querySelectorAll(".react-datepicker__month-option"),
    ).find((option) => option.textContent?.includes("July"));
    fireEvent.click(july!);
    return { container, onMonthChange };
  }

  it("does not snap back when navigating to a month with no selectable days", () => {
    const { container, onMonthChange } = navigateToJuly();

    expect(onMonthChange).toHaveBeenCalledTimes(1);
    expect(onMonthChange.mock.calls[0]?.[0].getMonth()).toBe(6);
    expect(
      safeQuerySelector(container, ".react-datepicker__month").getAttribute(
        "aria-label",
      ),
    ).toContain("July");
  });
});
