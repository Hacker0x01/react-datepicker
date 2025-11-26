import { fireEvent, render } from "@testing-library/react";
import { act } from "react";
import React from "react";

import DatePicker from "../index";
import TimeComponent from "../time";

import { safeQuerySelector, setupMockResizeObserver } from "./test_utils";

describe("DatePicker", () => {
  beforeAll(() => {
    setupMockResizeObserver();
  });

  it("should show time component when showTimeSelect prop is present", () => {
    const { container } = render(<DatePicker showTimeSelect open />);
    const timeComponent = container.querySelector(
      ".react-datepicker__time-container",
    );
    expect(timeComponent).not.toBeNull();
  });

  it("should have custom time caption", () => {
    const { container } = render(<TimeComponent timeCaption="Custom time" />);

    const caption = container.querySelector(".react-datepicker-time__header");
    expect(caption?.textContent).toEqual("Custom time");
  });

  describe("Time Select Only", () => {
    let datePicker: HTMLElement;
    beforeEach(() => {
      datePicker = render(
        <DatePicker showTimeSelect showTimeSelectOnly todayButton="Today" />,
      ).container;

      const input = safeQuerySelector(datePicker, "input");
      fireEvent.click(input);
    });

    it("should not show month container when showTimeSelectOnly prop is present", () => {
      const elem = datePicker.querySelectorAll(
        ".react-datepicker__month-container",
      );
      expect(elem).toHaveLength(0);
    });

    it("should not show previous month button when showTimeSelectOnly prop is present", () => {
      const elem = datePicker.querySelectorAll(
        ".react-datepicker__navigation--previous",
      );
      expect(elem).toHaveLength(0);
    });

    it("should not show next month button when showTimeSelectOnly prop is present", () => {
      const elem = datePicker.querySelectorAll(
        ".react-datepicker__navigation--next",
      );
      expect(elem).toHaveLength(0);
    });

    it("should not show today button when showTimeSelectOnly prop is present", () => {
      const elem = datePicker.querySelectorAll(
        ".react-datepicker__today-button",
      );
      expect(elem).toHaveLength(0);
    });
  });

  describe("Time input interactions", () => {
    it("should show input-time container when showTimeInput prop is present", () => {
      const { container } = render(<DatePicker showTimeInput open />);
      const component = container.querySelector(
        ".react-datepicker__input-time-container",
      );
      expect(component).not.toBeNull();
    });

    it("should retain focus on input after value change", () => {
      const { container } = render(<DatePicker showTimeInput open />);
      const input = safeQuerySelector<HTMLInputElement>(container, "input");

      act(() => {
        input.focus();
      });
      expect(document.activeElement).toBe(input);

      fireEvent.change(input, {
        target: { value: "13:00" },
      });

      expect(document.activeElement).toBe(input);
    });

    it("should focus the time input when clicked", () => {
      const { container } = render(
        <DatePicker shouldCloseOnSelect={false} showTimeInput />,
      );

      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);
      const timeInput = safeQuerySelector<HTMLInputElement>(
        container,
        'input[type="time"].react-datepicker-time__input',
      );

      fireEvent.click(timeInput);
      expect(document.activeElement).toBe(timeInput);
    });

    it("should handle invalid time input gracefully", () => {
      const onChange = jest.fn();
      const { container } = render(
        <DatePicker
          selected={new Date("2024-01-15T10:00:00")}
          onChange={onChange}
          showTimeInput
        />,
      );

      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);

      const timeInput = safeQuerySelector<HTMLInputElement>(
        container,
        'input[type="time"].react-datepicker-time__input',
      );

      fireEvent.change(timeInput, {
        target: { value: "invalid" },
      });

      expect(onChange).toHaveBeenCalled();
    });

    it("should handle time change when no date is selected", () => {
      const onChange = jest.fn();
      const { container } = render(
        <DatePicker selected={null} onChange={onChange} showTimeInput />,
      );

      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);

      const timeInput = safeQuerySelector<HTMLInputElement>(
        container,
        'input[type="time"].react-datepicker-time__input',
      );

      fireEvent.change(timeInput, {
        target: { value: "14:30" },
      });

      expect(onChange).toHaveBeenCalled();
    });

    it("should call onChange with updated date when valid time is entered", () => {
      const onChange = jest.fn();
      const selectedDate = new Date("2024-01-15T10:00:00");

      const { container } = render(
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          showTimeInput
        />,
      );

      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);

      const timeInput = safeQuerySelector<HTMLInputElement>(
        container,
        'input[type="time"].react-datepicker-time__input',
      );

      fireEvent.change(timeInput, {
        target: { value: "15:45" },
      });

      const expectedDate = new Date(selectedDate);
      expectedDate.setHours(15);
      expectedDate.setMinutes(45);

      expect(onChange).toHaveBeenCalledWith(expectedDate);
    });
  });
});
