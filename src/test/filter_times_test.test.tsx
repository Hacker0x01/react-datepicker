import { render } from "@testing-library/react";
import React from "react";

import { getHours } from "../date_utils";
import TimeComponent from "../time";

describe("TimeComponent", () => {
  const HOUR_TO_DISABLE_IN_12_HR = 5;
  const HOUR_TO_DISABLE_IN_24_HR = 17;

  it("should disable times matched by filterTime prop", () => {
    const { container: timeComponent } = render(
      <TimeComponent
        filterTime={(time) => getHours(time) !== HOUR_TO_DISABLE_IN_24_HR}
      />,
    );

    const disabledTimeItems = timeComponent.querySelectorAll(
      ".react-datepicker__time-list-item--disabled",
    );

    const disabledAllFilterTimes = Array.from(disabledTimeItems).every(
      (disabledTimeItem) => {
        const disabledTimeItemValue = (
          disabledTimeItem.textContent ?? ""
        ).trim();
        return (
          disabledTimeItemValue.startsWith(`${HOUR_TO_DISABLE_IN_12_HR}:`) ||
          disabledTimeItemValue.startsWith(`${HOUR_TO_DISABLE_IN_24_HR}:`)
        );
      },
    );

    expect(disabledAllFilterTimes).toBe(true);
  });

  it("should add aria-disabled to the disabled times matched by filterTime prop", () => {
    const { container: timeComponent } = render(
      <TimeComponent
        filterTime={(time) => getHours(time) !== HOUR_TO_DISABLE_IN_24_HR}
      />,
    );

    const disabledTimeItems = timeComponent.querySelectorAll(
      ".react-datepicker__time-list-item--disabled",
    );

    const allDisabledTimeItemsHaveAriaDisabled = Array.from(
      disabledTimeItems,
    ).every((time) => time.getAttribute("aria-disabled") === "true");
    expect(allDisabledTimeItemsHaveAriaDisabled).toBe(true);
  });
});
