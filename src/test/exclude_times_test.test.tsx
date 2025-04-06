import { render } from "@testing-library/react";
import React from "react";

import { setTime, newDate } from "../date_utils";
import { setupMockResizeObserver } from "./test_utils";
import DatePicker from "../index";

describe("DatePicker", () => {
  let now: Date, excludeTimes: Date[];

  beforeAll(() => {
    setupMockResizeObserver();
  });

  beforeEach(() => {
    now = newDate();
    excludeTimes = [
      setTime(now, { hour: 17, minute: 0 }),
      setTime(now, { hour: 18, minute: 30 }),
      setTime(now, { hour: 19, minute: 30 }),
      setTime(now, { hour: 17, minute: 30 }),
    ];
  });

  it("should disable times specified in excludeTimes props", () => {
    const { container: datePicker } = render(
      <DatePicker open showTimeSelect excludeTimes={excludeTimes} />,
    );

    const disabledTimeItems = datePicker.querySelectorAll(
      ".react-datepicker__time-list-item--disabled",
    );
    expect(disabledTimeItems.length).toBe(excludeTimes.length);
  });

  it("should add aria-disabled to all the excluded times", () => {
    const { container: datePicker } = render(
      <DatePicker open showTimeSelect excludeTimes={excludeTimes} />,
    );

    const disabledTimeItems = datePicker.querySelectorAll(
      ".react-datepicker__time-list-item--disabled",
    );

    const allDisabledTimeItemsHaveAriaDisabled = Array.from(
      disabledTimeItems,
    ).every((time) => time.getAttribute("aria-disabled") === "true");
    expect(allDisabledTimeItemsHaveAriaDisabled).toBe(true);
  });
});
