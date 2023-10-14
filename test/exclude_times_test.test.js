import React from "react";
import { render } from "@testing-library/react";
import { setTime, newDate } from "../src/date_utils";
import DatePicker from "../src/index.jsx";

describe("DatePicker", () => {
  it("should disable times specified in excludeTimes props", () => {
    const now = newDate();

    const { container: datePicker } = render(
      <DatePicker
        open
        showTimeSelect
        excludeTimes={[
          setTime(now, { hour: 17, minute: 0 }),
          setTime(now, { hour: 18, minute: 30 }),
          setTime(now, { hour: 19, minute: 30 }),
          setTime(now, { hour: 17, minute: 30 }),
        ]}
      />,
    );

    const disabledTimeItems = datePicker.querySelectorAll(
      ".react-datepicker__time-list-item--disabled",
    );
    expect(disabledTimeItems.length).toBe(4);

    const ariaDisabledTimeItems = Array.from(disabledTimeItems).filter(
      (time) => time.getAttribute("aria-disabled") === "true",
    );
    expect(ariaDisabledTimeItems.length).toBe(4);
  });
});
