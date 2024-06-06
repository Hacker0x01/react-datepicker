import { render } from "@testing-library/react";
import React from "react";

import {
  addHours,
  addMinutes,
  addSeconds,
  getStartOfDay,
  newDate,
} from "../date_utils";
import TimeComponent from "../time";

describe("TimeComponent", () => {
  it("should show times specified in injectTimes props", () => {
    const today = getStartOfDay(newDate());
    const { container } = render(
      <TimeComponent
        injectTimes={[
          addMinutes(today, 1),
          addMinutes(today, 725),
          addMinutes(today, 1439),
        ]}
      />,
    );

    const injectedItems = container.querySelectorAll(
      ".react-datepicker__time-list-item--injected",
    );
    expect(injectedItems).toHaveLength(3);
  });

  it("should not affect existing time intervals", () => {
    const today = getStartOfDay(newDate());
    const { container } = render(
      <TimeComponent
        intervals={60}
        injectTimes={[
          addMinutes(today, 0),
          addMinutes(today, 60),
          addMinutes(today, 1440),
        ]}
      />,
    );

    const injectedItems = container.querySelectorAll(
      ".react-datepicker__time-list-item--injected",
    );
    expect(injectedItems).toHaveLength(0);
  });

  it("should allow multiple injected times per interval", () => {
    const today = getStartOfDay(newDate());
    const { container } = render(
      <TimeComponent
        intervals={60}
        injectTimes={[
          addMinutes(today, 1),
          addMinutes(today, 2),
          addMinutes(today, 3),
        ]}
      />,
    );

    const injectedItems = container.querySelectorAll(
      ".react-datepicker__time-list-item--injected",
    );
    expect(injectedItems).toHaveLength(3);
  });

  it("should sort injected times automatically", () => {
    const today = getStartOfDay(newDate());

    const { container } = render(
      <TimeComponent
        intervals={60}
        injectTimes={[
          addMinutes(today, 3),
          addMinutes(today, 1),
          addMinutes(today, 2),
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

  it("should support hours, minutes, and seconds", () => {
    const today = getStartOfDay(newDate());

    const { container } = render(
      <TimeComponent
        format="HH:mm:ss"
        intervals={60}
        injectTimes={[
          addSeconds(today, 1),
          addMinutes(addSeconds(today, 1), 30),
          addHours(addMinutes(addSeconds(today, 1), 30), 1),
        ]}
      />,
    );

    const injectedItems = container.querySelectorAll(
      ".react-datepicker__time-list-item--injected",
    );

    expect(Array.from(injectedItems).map((node) => node.textContent)).toEqual([
      "00:00:01",
      "00:30:01",
      "01:30:01",
    ]);
  });
});
