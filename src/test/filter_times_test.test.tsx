import { fireEvent, render } from "@testing-library/react";
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

  it("should block onChange for disabled times", () => {
    const onChange = jest.fn();
    const { container } = render(
      <TimeComponent
        onChange={onChange}
        filterTime={(time) => getHours(time) !== HOUR_TO_DISABLE_IN_24_HR}
      />,
    );

    const disabledTime = Array.from(
      container.querySelectorAll(".react-datepicker__time-list-item"),
    ).find((node) =>
      node.classList.contains("react-datepicker__time-list-item--disabled"),
    ) as HTMLElement;

    fireEvent.click(disabledTime);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("should call onChange for enabled times", () => {
    const onChange = jest.fn();
    const { container } = render(
      <TimeComponent onChange={onChange} filterTime={() => true} />,
    );

    const enabledTime = Array.from(
      container.querySelectorAll(".react-datepicker__time-list-item"),
    ).find(
      (node) =>
        !node.classList.contains("react-datepicker__time-list-item--disabled"),
    ) as HTMLElement;

    fireEvent.click(enabledTime);

    expect(onChange).toHaveBeenCalled();
  });

  it("should prevent clicks outside the provided min/max time range", () => {
    const onChange = jest.fn();
    const minTime = new Date("2024-01-01T08:00:00");
    const maxTime = new Date("2024-01-01T10:00:00");
    const { container } = render(
      <TimeComponent
        onChange={onChange}
        minTime={minTime}
        maxTime={maxTime}
        selected={new Date("2024-01-01T07:00:00")}
      />,
    );

    const disabledSlot = Array.from(
      container.querySelectorAll(".react-datepicker__time-list-item"),
    ).find((node) =>
      node.classList.contains("react-datepicker__time-list-item--disabled"),
    ) as HTMLElement;

    fireEvent.click(disabledSlot);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("should allow clicks within the min/max time range", () => {
    const onChange = jest.fn();
    const minTime = new Date("2024-01-01T08:00:00");
    const maxTime = new Date("2024-01-01T10:00:00");
    const { container } = render(
      <TimeComponent
        onChange={onChange}
        minTime={minTime}
        maxTime={maxTime}
        selected={new Date("2024-01-01T08:30:00")}
      />,
    );

    const enabledSlot = Array.from(
      container.querySelectorAll(".react-datepicker__time-list-item"),
    ).find(
      (node) =>
        !node.classList.contains("react-datepicker__time-list-item--disabled"),
    ) as HTMLElement;

    fireEvent.click(enabledSlot);

    expect(onChange).toHaveBeenCalled();
  });
});
