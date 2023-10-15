import React from "react";
import { render } from "@testing-library/react";
import { getHours } from "../src/date_utils";
import TimeComponent from "../src/time";

describe("TimeComponent", () => {
  it("should disable times matched by filterTime prop", () => {
    const { container: timeComponent } = render(
      <TimeComponent filterTime={(time) => getHours(time) !== 17} />,
    );

    const disabledTimeItems = timeComponent.querySelectorAll(
      ".react-datepicker__time-list-item--disabled",
    );
    expect(disabledTimeItems.length).toBe(2);

    const allDisabledTimeItemsHaveAriaDisabled = Array.from(
      disabledTimeItems,
    ).every((time) => time.getAttribute("aria-disabled") === "true");
    expect(allDisabledTimeItemsHaveAriaDisabled).toBe(true);
  });
});
