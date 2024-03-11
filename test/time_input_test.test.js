import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DatePicker from "../src/index.jsx";
import InputTimeComponent from "../src/inputTime.jsx";
import CustomTimeInput from "./helper_components/custom_time_input.jsx";

describe("timeInput", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should show time component when showTimeSelect prop is present", () => {
    const { container } = render(<DatePicker showTimeInput open />);
    const component = container.querySelector(
      ".react-datepicker__input-time-container",
    );
    expect(component).not.toBeNull();
  });

  it("should have custom time caption", () => {
    const { container } = render(
      <InputTimeComponent timeInputLabel="Custom time" />,
    );
    const caption = container.querySelector(".react-datepicker-time__caption");
    expect(caption.textContent).toEqual("Custom time");
  });

  it("should trigger onChange event", () => {
    const onChangeSpy = jest.fn();
    const { container } = render(<InputTimeComponent onChange={onChangeSpy} />);
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: "13:00" } });
    expect(input.value).toEqual("13:00");
  });

  it("should trigger onChange event and set the value as last valid timeString if empty string is passed as time input value", () => {
    const { container } = render(
      <InputTimeComponent timeString="13:00" onChange={() => {}} />,
    );
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toEqual("13:00");
  });

  it("should trigger onChange event on a custom time input without using the last valid timeString", () => {
    const onChangeSpy = jest.fn();
    const mockDate = new Date("2023-09-30");
    const { container } = render(
      <InputTimeComponent
        date={mockDate}
        timeString="13:00"
        customTimeInput={<CustomTimeInput />}
        onChange={onChangeSpy}
      />,
    );

    const newTime = "14:00";
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: newTime } });

    const expectedDate = new Date(mockDate);
    const [expectedHours, expectedMinutes] = newTime.split(":");
    expectedDate.setHours(expectedHours);
    expectedDate.setMinutes(expectedMinutes);

    expect(onChangeSpy).toHaveBeenCalledWith(expectedDate);
  });

  it("should pass pure Date to custom time input", () => {
    const onTimeChangeSpy = jest.fn();
    const mockDate = new Date("2023-09-30");
    const { container } = render(
      <InputTimeComponent
        date={mockDate}
        timeString="13:00"
        customTimeInput={<CustomTimeInput onTimeChange={onTimeChangeSpy} />}
      />,
    );

    const newTime = "14:00";
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: newTime } });

    expect(onTimeChangeSpy).toHaveBeenCalledWith(mockDate);
  });

  it("should trigger onChange event with the specified date prop if available", () => {
    const mockOnChange = jest.fn();
    const mockDate = new Date("2023-09-30");

    const { container } = render(
      <InputTimeComponent date={mockDate} onChange={mockOnChange} />,
    );

    const newTime = "13:00";
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: newTime } });

    const expectedDate = new Date(mockDate);
    const [expectedHours, expectedMinutes] = newTime.split(":");
    expectedDate.setHours(expectedHours);
    expectedDate.setMinutes(expectedMinutes);

    expect(mockOnChange).toHaveBeenCalledWith(expectedDate);
  });

  it("should trigger onChange event with the default date when date prop is missing", () => {
    const mockOnChange = jest.fn();
    const mockCurrentDate = new Date("2023-09-30");
    const dateSpy = jest
      .spyOn(global, "Date")
      .mockImplementation(() => mockCurrentDate);

    const { container } = render(
      <InputTimeComponent onChange={mockOnChange} />,
    );

    const newTime = "13:00";
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: newTime } });

    const expectedDate = new Date(mockCurrentDate);
    const [expectedHours, expectedMinutes] = newTime.split(":");
    expectedDate.setHours(expectedHours);
    expectedDate.setMinutes(expectedMinutes);

    expect(mockOnChange).toHaveBeenCalledWith(expectedDate);

    dateSpy.mockRestore();
  });
});
