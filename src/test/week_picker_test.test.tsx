import { render, fireEvent } from "@testing-library/react";
import React from "react";

import DatePicker from "../index";

import { safeQuerySelector } from "./test_utils";

describe("WeekPicker", () => {
  it("should change the week when clicked on any option in the picker", () => {
    const onChangeSpy = jest.fn();
    const { container } = render(
      <DatePicker onChange={onChangeSpy} showWeekPicker />,
    );
    expect(onChangeSpy).not.toHaveBeenCalled();

    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);

    const dayElement = safeQuerySelector(container, ".react-datepicker__day");
    fireEvent.click(dayElement);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it("should change the week when clicked on any week number in the picker", () => {
    const onChangeSpy = jest.fn();
    const { container } = render(
      <DatePicker onChange={onChangeSpy} showWeekPicker showWeekNumbers />,
    );
    expect(onChangeSpy).not.toHaveBeenCalled();
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    const weekNumber = safeQuerySelector(
      container,
      ".react-datepicker__week-number",
    );
    fireEvent.click(weekNumber);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it("should change the week with few disabled dates (not all) when clicked on any week number in the picker", () => {
    const onChangeSpy = jest.fn();
    const { container } = render(
      <DatePicker
        selected={new Date("2024-01-01")}
        onChange={onChangeSpy}
        showWeekPicker
        showWeekNumbers
        excludeDateIntervals={[
          { start: new Date("2024/01/07"), end: new Date("2024/01/11") },
        ]}
      />,
    );

    const input = container.querySelector("input")!;
    expect(input).not.toBeNull();

    fireEvent.focus(input);
    const weekNumber = container.querySelector(
      '.react-datepicker__week-number[aria-label="week  1"]',
    )!;
    expect(weekNumber).not.toBeNull();
    fireEvent.click(weekNumber);

    expect(onChangeSpy).toHaveBeenCalledTimes(1);

    const selectedDate = onChangeSpy.mock.calls[0][0];
    expect(selectedDate.getFullYear()).toBe(2024);
    expect(selectedDate.getMonth()).toBe(0);
    expect(selectedDate.getDate()).toBe(12);
  });

  it("should not change the week with all the dates in a selected week is disabled", () => {
    const onChangeSpy = jest.fn();
    const { container } = render(
      <DatePicker
        selected={new Date("2024-01-01")}
        onChange={onChangeSpy}
        showWeekPicker
        showWeekNumbers
        excludeDateIntervals={[
          { start: new Date("2024/01/07"), end: new Date("2024/01/13") },
        ]}
      />,
    );

    const input = container.querySelector("input")!;
    expect(input).not.toBeNull();

    fireEvent.focus(input);
    const weekNumber = container.querySelector(
      '.react-datepicker__week-number[aria-label="week  1"]',
    )!;
    expect(weekNumber).not.toBeNull();
    fireEvent.click(weekNumber);

    expect(onChangeSpy).not.toHaveBeenCalled();
  });
});
