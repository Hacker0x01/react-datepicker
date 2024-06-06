import { render, fireEvent } from "@testing-library/react";
import React from "react";

import DatePicker from "../index";

describe("WeekPicker", () => {
  it("should change the week when clicked on any option in the picker", () => {
    const onChangeSpy = jest.fn();
    const { container } = render(
      <DatePicker onChange={onChangeSpy} showWeekPicker />,
    );
    expect(onChangeSpy).not.toHaveBeenCalled();
    fireEvent.focus(container.querySelector("input") ?? new HTMLElement());
    fireEvent.click(
      container.querySelector(".react-datepicker__day") ?? new HTMLElement(),
    );
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it("should change the week when clicked on any week number in the picker", () => {
    const onChangeSpy = jest.fn();
    const { container } = render(
      <DatePicker onChange={onChangeSpy} showWeekPicker showWeekNumbers />,
    );
    expect(onChangeSpy).not.toHaveBeenCalled();
    const input = container.querySelector("input");
    expect(input).not.toBeNull();
    fireEvent.focus(input ?? new HTMLElement());
    const weekNumber = container.querySelector(
      ".react-datepicker__week-number",
    );
    expect(weekNumber).not.toBeNull();
    fireEvent.click(weekNumber ?? new HTMLElement());
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
