import React from "react";
import { render } from "@testing-library/react";
import * as utils from "../src/date_utils";
import TimeComponent from "../src/time";

describe("TimeComponent", () => {
  let today, includeTimes;

  beforeEach(() => {
    today = utils.getStartOfDay(utils.newDate());
    includeTimes = [
      utils.addMinutes(today, 60),
      utils.addMinutes(today, 120),
      utils.addMinutes(today, 150),
    ];
  });

  it("should only enable times specified in includeTimes props", () => {
    const { container: timeComponent } = render(
      <TimeComponent includeTimes={includeTimes} />,
    );

    const allTimeItems = timeComponent.querySelectorAll(
      ".react-datepicker__time-list-item",
    );
    const disabledTimeItems = timeComponent.querySelectorAll(
      ".react-datepicker__time-list-item--disabled",
    );

    const expectedDisabledTimeItems = allTimeItems.length - includeTimes.length;
    expect(disabledTimeItems.length).toBe(expectedDisabledTimeItems);
  });

  it("should not add aria-disabled attribute on all the enabled times", () => {
    const { container: timeComponent } = render(
      <TimeComponent includeTimes={includeTimes} />,
    );

    const allTimeItems = timeComponent.querySelectorAll(
      ".react-datepicker__time-list-item",
    );
    const enabledTimeItems = Array.from(allTimeItems).filter(
      (timeItem) =>
        !timeItem.classList.contains(
          "react-datepicker__time-list-item--disabled",
        ),
    );

    const enabledTimeItemsHasNoAriaDisabled = Array.from(
      enabledTimeItems,
    ).every((timeItem) => {
      const ariaDisabledValue = timeItem.getAttribute("aria-disabled");
      return !ariaDisabledValue || ariaDisabledValue.toLowerCase() === "false";
    });
    expect(enabledTimeItemsHasNoAriaDisabled).toBe(true);
  });
});
