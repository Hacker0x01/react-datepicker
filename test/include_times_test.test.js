import React from "react";
import { render } from "@testing-library/react";
import * as utils from "../src/date_utils";
import TimeComponent from "../src/time";

describe("TimeComponent", () => {
  it("should only enable times specified in includeTimes props", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const { container: timeComponent } = render(
      <TimeComponent
        includeTimes={[
          utils.addMinutes(today, 60),
          utils.addMinutes(today, 120),
          utils.addMinutes(today, 150),
        ]}
      />,
    );

    const disabledTimeItems = timeComponent.querySelectorAll(
      ".react-datepicker__time-list-item--disabled",
    );
    expect(disabledTimeItems.length).toBe(45);

    const allDisabledTimeItemsHaveAriaDisabled = Array.from(
      disabledTimeItems,
    ).every((time) => time.getAttribute("aria-disabled") === "true");
    expect(allDisabledTimeItemsHaveAriaDisabled).toBe(true);
  });
});
