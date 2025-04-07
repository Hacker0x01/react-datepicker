import { render, fireEvent } from "@testing-library/react";
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
});
