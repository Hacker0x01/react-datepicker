import { render } from "@testing-library/react";
import { addDays, subDays } from "date-fns";
import React from "react";

import DatePicker from "../index";

describe("DatePicker", () => {
  const today = new Date();
  // otherDate must be in same month, otherwise it will not be shown on the calendar
  const otherDate =
    today.getDate() === 1 ? addDays(today, 1) : subDays(today, 1);
  const excludeDates = [today, otherDate];
  const excludeDatesWithMessages = [
    { date: otherDate, message: "This day is excluded" },
    { date: today, message: "Today is excluded" },
  ];

  it("should disable dates specified in excludeDates props", () => {
    const { container: datePicker } = render(
      <DatePicker
        open
        excludeDates={excludeDates}
        placeholderText="Select a date other than today or yesterday"
      />,
    );

    const disabledTimeItems = datePicker.querySelectorAll(
      ".react-datepicker__day--excluded",
    );
    expect(disabledTimeItems.length).toBe(excludeDates.length);
  });

  it("should disable dates specified in excludeDates props and should show the reason", () => {
    const { container: datePicker } = render(
      <DatePicker
        open
        excludeDates={excludeDatesWithMessages}
        placeholderText="Select a date other than today or yesterday"
      />,
    );

    const disabledTimeItems = datePicker.querySelectorAll(
      ".react-datepicker__day--excluded",
    );

    expect(disabledTimeItems.length).toBe(excludeDatesWithMessages.length);
    expect(
      disabledTimeItems[today < otherDate ? 1 : 0]?.getAttribute("title"),
    ).toBe("This day is excluded");
    expect(
      disabledTimeItems[today < otherDate ? 0 : 1]?.getAttribute("title"),
    ).toBe("Today is excluded");
  });
});
