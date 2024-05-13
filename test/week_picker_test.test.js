import React from "react";
import DatePicker from "../src/index";
import { render, fireEvent } from "@testing-library/react";

describe("WeekPicker", () => {
  it("should change the week when clicked on any option in the picker", () => {
    const onChangeSpy = jest.fn();
    const { container } = render(
      <DatePicker onChange={onChangeSpy} showWeekPicker />,
    );
    expect(onChangeSpy).not.toHaveBeenCalled();
    fireEvent.focus(container.querySelector("input"));
    fireEvent.click(container.querySelector(".react-datepicker__day"));
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it("should change the week when clicked on any week number in the picker", () => {
    const onChangeSpy = jest.fn();
    const { container } = render(
      <DatePicker onChange={onChangeSpy} showWeekPicker showWeekNumbers />,
    );
    expect(onChangeSpy).not.toHaveBeenCalled();
    fireEvent.focus(container.querySelector("input"));
    fireEvent.click(container.querySelector(".react-datepicker__week-number"));
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
