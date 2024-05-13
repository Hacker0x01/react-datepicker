import React from "react";
import { render } from "@testing-library/react";
import DatePicker from "../src/index";
import { subDays } from "date-fns";

describe("DatePicker", () => {
  const excludeDates = [new Date(), subDays(new Date(), 1)];
  const excludeDatesWithMessages = [
    { date: subDays(new Date(), 1), message: "This day is excluded" },
    { date: new Date(), message: "Today is excluded" },
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
    expect(disabledTimeItems[0].getAttribute("title")).toBe(
      "This day is excluded",
    );
    expect(disabledTimeItems[1].getAttribute("title")).toBe(
      "Today is excluded",
    );
  });
});
