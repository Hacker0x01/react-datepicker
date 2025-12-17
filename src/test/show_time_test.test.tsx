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

  describe("Time Select Only with openToDate", () => {
    it("should use openToDate as the base date when selecting time with showTimeSelectOnly and selected is null", () => {
      const onChange = jest.fn();
      const openToDate = new Date("2025-11-01T00:00:00");

      const { container } = render(
        <DatePicker
          selected={null}
          openToDate={openToDate}
          onChange={onChange}
          showTimeSelect
          showTimeSelectOnly
        />,
      );

      const input = safeQuerySelector(container, "input");
      fireEvent.click(input);

      // Find and click a time option (e.g., 09:00)
      const timeListItems = container.querySelectorAll(
        ".react-datepicker__time-list-item",
      );
      expect(timeListItems.length).toBeGreaterThan(0);

      // Click on a time option
      fireEvent.click(timeListItems[0]!);

      expect(onChange).toHaveBeenCalled();
      const selectedDate = onChange.mock.calls[0][0] as Date;

      // Verify the date part comes from openToDate
      expect(selectedDate.getFullYear()).toBe(2025);
      expect(selectedDate.getMonth()).toBe(10); // November is month 10 (0-indexed)
      expect(selectedDate.getDate()).toBe(1);
    });

    it("should use current date when showTimeSelectOnly is true and neither selected nor openToDate is provided", () => {
      const onChange = jest.fn();
      const today = new Date();

      const { container } = render(
        <DatePicker
          selected={null}
          onChange={onChange}
          showTimeSelect
          showTimeSelectOnly
        />,
      );

      const input = safeQuerySelector(container, "input");
      fireEvent.click(input);

      const timeListItems = container.querySelectorAll(
        ".react-datepicker__time-list-item",
      );
      expect(timeListItems.length).toBeGreaterThan(0);

      fireEvent.click(timeListItems[0]!);

      expect(onChange).toHaveBeenCalled();
      const selectedDate = onChange.mock.calls[0][0] as Date;

      // Verify the date part comes from today
      expect(selectedDate.getFullYear()).toBe(today.getFullYear());
      expect(selectedDate.getMonth()).toBe(today.getMonth());
      expect(selectedDate.getDate()).toBe(today.getDate());
    });

    it("should use openToDate for showTimeInput when selected is null", () => {
      const onChange = jest.fn();
      const openToDate = new Date("2025-11-01T00:00:00");

      const { container } = render(
        <DatePicker
          selected={null}
          openToDate={openToDate}
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
        target: { value: "14:30" },
      });

      expect(onChange).toHaveBeenCalled();
      const selectedDate = onChange.mock.calls[0][0] as Date;

      // Verify the date part comes from openToDate
      expect(selectedDate.getFullYear()).toBe(2025);
      expect(selectedDate.getMonth()).toBe(10); // November
      expect(selectedDate.getDate()).toBe(1);
      expect(selectedDate.getHours()).toBe(14);
      expect(selectedDate.getMinutes()).toBe(30);
    });
  });
});
