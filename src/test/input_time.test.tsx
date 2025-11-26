import { render, fireEvent } from "@testing-library/react";
import React from "react";

import InputTime from "../input_time";

import CustomTimeInput from "./helper_components/custom_time_input";

describe("InputTime", () => {
  it("renders with default props", () => {
    const { container } = render(<InputTime />);

    const timeInput = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;
    expect(timeInput).toBeTruthy();
    expect(timeInput.className).toBe("react-datepicker-time__input");
    expect(timeInput.placeholder).toBe("Time");
  });

  it("renders with timeString prop", () => {
    const { container } = render(<InputTime timeString="14:30" />);

    const timeInput = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;
    expect(timeInput.value).toBe("14:30");
  });

  it("renders with timeInputLabel prop", () => {
    const { container } = render(<InputTime timeInputLabel="Select Time" />);

    const label = container.querySelector(
      ".react-datepicker-time__caption",
    ) as HTMLElement;
    expect(label.textContent).toBe("Select Time");
  });

  it("calls onChange when time is changed", () => {
    const onChangeMock = jest.fn();
    const { container } = render(
      <InputTime onChange={onChangeMock} timeString="10:00" />,
    );

    const timeInput = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;
    fireEvent.change(timeInput, { target: { value: "15:45" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    const calledDate = onChangeMock.mock.calls[0][0];
    expect(calledDate.getHours()).toBe(15);
    expect(calledDate.getMinutes()).toBe(45);
  });

  it("updates state when timeString prop changes", () => {
    const { container, rerender } = render(<InputTime timeString="10:00" />);

    let timeInput = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;
    expect(timeInput.value).toBe("10:00");

    rerender(<InputTime timeString="16:30" />);

    timeInput = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;
    expect(timeInput.value).toBe("16:30");
  });

  it("uses provided date when onChange is called", () => {
    const onChangeMock = jest.fn();
    const testDate = new Date(2023, 5, 15, 10, 30);

    const { container } = render(
      <InputTime onChange={onChangeMock} date={testDate} timeString="10:30" />,
    );

    const timeInput = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;
    fireEvent.change(timeInput, { target: { value: "14:45" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    const calledDate = onChangeMock.mock.calls[0][0];
    expect(calledDate.getFullYear()).toBe(2023);
    expect(calledDate.getMonth()).toBe(5);
    expect(calledDate.getDate()).toBe(15);
    expect(calledDate.getHours()).toBe(14);
    expect(calledDate.getMinutes()).toBe(45);
  });

  it("creates new date when no date prop is provided", () => {
    const onChangeMock = jest.fn();
    const { container } = render(
      <InputTime onChange={onChangeMock} timeString="10:00" />,
    );

    const timeInput = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;
    fireEvent.change(timeInput, { target: { value: "14:45" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    const calledDate = onChangeMock.mock.calls[0][0];
    expect(calledDate).toBeInstanceOf(Date);
    expect(calledDate.getHours()).toBe(14);
    expect(calledDate.getMinutes()).toBe(45);
  });

  it("renders custom time input when provided", () => {
    const CustomTimeInput = ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (time: string) => void;
    }) => (
      <input
        data-testid="custom-time-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );

    const { container } = render(
      <InputTime
        customTimeInput={<CustomTimeInput value="" onChange={() => {}} />}
        timeString="12:00"
      />,
    );

    const customInput = container.querySelector(
      '[data-testid="custom-time-input"]',
    ) as HTMLInputElement;
    expect(customInput).toBeTruthy();
    expect(customInput.value).toBe("12:00");
  });

  it("calls onChange with custom time input", () => {
    const onChangeMock = jest.fn();
    const CustomTimeInput = ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (time: string) => void;
    }) => (
      <input
        data-testid="custom-time-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );

    const { container } = render(
      <InputTime
        onChange={onChangeMock}
        customTimeInput={<CustomTimeInput value="" onChange={() => {}} />}
        timeString="12:00"
      />,
    );

    const customInput = container.querySelector(
      '[data-testid="custom-time-input"]',
    ) as HTMLInputElement;
    fireEvent.change(customInput, { target: { value: "18:30" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    const calledDate = onChangeMock.mock.calls[0][0];
    expect(calledDate.getHours()).toBe(18);
    expect(calledDate.getMinutes()).toBe(30);
  });

  it("focuses input when clicked", () => {
    const { container } = render(<InputTime timeString="10:00" />);

    const timeInput = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;
    const focusSpy = jest.spyOn(timeInput, "focus");

    fireEvent.click(timeInput);

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it("uses timeString as fallback when onChange value is empty", () => {
    const onChangeMock = jest.fn();
    const { container } = render(
      <InputTime onChange={onChangeMock} timeString="10:00" />,
    );

    const timeInput = container.querySelector(
      'input[type="time"]',
    ) as HTMLInputElement;
    fireEvent.change(timeInput, { target: { value: "" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(timeInput.value).toBe("10:00");
  });

  it("passes provided date through customTimeInput onTimeChange handler", () => {
    const onTimeChange = jest.fn();
    const date = new Date("2023-09-30T10:00:00");

    const { container } = render(
      <InputTime
        date={date}
        timeString="10:00"
        customTimeInput={
          <CustomTimeInput
            data-testid="custom-time-input"
            onTimeChange={onTimeChange}
          />
        }
      />,
    );

    const customInput = container.querySelector(
      '[data-testid="custom-time-input"]',
    ) as HTMLInputElement;
    fireEvent.change(customInput, { target: { value: "11:15" } });

    expect(onTimeChange).toHaveBeenCalledWith(date);
  });

  it("preserves existing time when custom input emits value without colon", () => {
    const onChange = jest.fn();
    const date = new Date("2023-09-30T11:00:00");

    const { container } = render(
      <InputTime
        date={date}
        timeString="11:00"
        onChange={onChange}
        customTimeInput={<CustomTimeInput data-testid="partial-input" />}
      />,
    );

    const customInput = container.querySelector(
      '[data-testid="partial-input"]',
    ) as HTMLInputElement;

    fireEvent.change(customInput, { target: { value: "invalid" } });

    expect(onChange).toHaveBeenCalledTimes(1);
    const calledDate = onChange.mock.calls[0][0];
    expect(calledDate.getHours()).toBe(11);
    expect(calledDate.getMinutes()).toBe(0);
  });

  it("renders container with correct class names", () => {
    const { container } = render(<InputTime />);

    expect(
      container.querySelector(".react-datepicker__input-time-container"),
    ).toBeTruthy();
    expect(
      container.querySelector(".react-datepicker-time__input-container"),
    ).toBeTruthy();
    expect(
      container.querySelector(".react-datepicker-time__input"),
    ).toBeTruthy();
  });
});
