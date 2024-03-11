import React from "react";
import { render } from "@testing-library/react";
import * as utils from "../src/date_utils";
import TimeComponent from "../src/time";

describe("TimeComponent", () => {
  it("should show times specified in injectTimes props", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const { container } = render(
      <TimeComponent
        injectTimes={[
          utils.addMinutes(today, 1),
          utils.addMinutes(today, 725),
          utils.addMinutes(today, 1439),
        ]}
      />,
    );

    const injectedItems = container.querySelectorAll(
      ".react-datepicker__time-list-item--injected",
    );
    expect(injectedItems).toHaveLength(3);
  });

  it("should not affect existing time intervals", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const { container } = render(
      <TimeComponent
        timeIntervals={60}
        injectTimes={[
          utils.addMinutes(today, 0),
          utils.addMinutes(today, 60),
          utils.addMinutes(today, 1440),
        ]}
      />,
    );

    const injectedItems = container.querySelectorAll(
      ".react-datepicker__time-list-item--injected",
    );
    expect(injectedItems).toHaveLength(0);
  });

  it("should allow multiple injected times per interval", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const { container } = render(
      <TimeComponent
        timeIntervals={60}
        injectTimes={[
          utils.addMinutes(today, 1),
          utils.addMinutes(today, 2),
          utils.addMinutes(today, 3),
        ]}
      />,
    );

    const injectedItems = container.querySelectorAll(
      ".react-datepicker__time-list-item--injected",
    );
    expect(injectedItems).toHaveLength(3);
  });

  it("should sort injected times automatically", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const { container } = render(
      <TimeComponent
        timeIntervals={60}
        injectTimes={[
          utils.addMinutes(today, 3),
          utils.addMinutes(today, 1),
          utils.addMinutes(today, 2),
        ]}
      />,
    );

    const injectedItems = container.querySelectorAll(
      ".react-datepicker__time-list-item--injected",
    );
    expect(Array.from(injectedItems).map((node) => node.textContent)).toEqual([
      "12:01 AM",
      "12:02 AM",
      "12:03 AM",
    ]);
  });
});
