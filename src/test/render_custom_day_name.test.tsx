import { render } from "@testing-library/react";
import React from "react";

import DatePicker from "../index";
import { ReactDatePickerCustomDayNameProps } from "../calendar";

describe("renderCustomDayName", () => {
  it("should call renderCustomDayName function with correct parameters", () => {
    const renderCustomDayName = jest.fn(
      ({ shortName }: ReactDatePickerCustomDayNameProps) => (
        <span>{shortName}</span>
      ),
    );

    render(<DatePicker renderCustomDayName={renderCustomDayName} inline />);

    // Should be called 7 times (one for each day of the week)
    expect(renderCustomDayName).toHaveBeenCalledTimes(7);

    // Check that it's called with correct parameters
    const firstCall = renderCustomDayName.mock.calls[0]?.[0];
    expect(firstCall).toBeDefined();
    expect(firstCall).toHaveProperty("day");
    expect(firstCall).toHaveProperty("shortName");
    expect(firstCall).toHaveProperty("fullName");
    expect(firstCall).toHaveProperty("locale");
    expect(firstCall).toHaveProperty("customDayNameCount");
    expect(firstCall?.day).toBeInstanceOf(Date);
    expect(typeof firstCall?.shortName).toBe("string");
    expect(typeof firstCall?.fullName).toBe("string");
    expect(typeof firstCall?.customDayNameCount).toBe("number");
  });

  it("should render custom day names", () => {
    const renderCustomDayName = ({
      shortName,
    }: ReactDatePickerCustomDayNameProps) => (
      <span className="custom-day-name">Custom-{shortName}</span>
    );

    const { container } = render(
      <DatePicker renderCustomDayName={renderCustomDayName} inline />,
    );

    const customDayNames = container.querySelectorAll(".custom-day-name");
    expect(customDayNames).toHaveLength(7);
    expect(customDayNames[0]?.textContent).toContain("Custom-");
  });

  it("should render default day names when renderCustomDayName is not provided", () => {
    const { container } = render(<DatePicker inline />);

    const dayNames = container.querySelectorAll(".react-datepicker__day-name");
    expect(dayNames).toHaveLength(7);

    // Check that default structure is present (sr-only + aria-hidden)
    const firstDayName = dayNames[0];
    expect(
      firstDayName?.querySelector(".react-datepicker__sr-only"),
    ).not.toBeNull();
    expect(firstDayName?.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it("should use custom day names with accessibility", () => {
    const renderCustomDayName = ({
      shortName,
      fullName,
    }: ReactDatePickerCustomDayNameProps) => (
      <>
        <span className="react-datepicker__sr-only">{fullName}</span>
        <span aria-hidden="true">{shortName}</span>
      </>
    );

    const { container } = render(
      <DatePicker renderCustomDayName={renderCustomDayName} inline />,
    );

    const dayNames = container.querySelectorAll(".react-datepicker__day-name");
    expect(dayNames).toHaveLength(7);

    // Check that accessibility structure is maintained
    dayNames.forEach((dayName) => {
      expect(
        dayName.querySelector(".react-datepicker__sr-only"),
      ).not.toBeNull();
      expect(dayName.querySelector('[aria-hidden="true"]')).not.toBeNull();
    });
  });

  it("should apply weekDayClassName along with custom day names", () => {
    const weekDayClassName = (date: Date) => {
      return date.getDay() === 0 || date.getDay() === 6 ? "weekend" : "";
    };

    const renderCustomDayName = ({
      shortName,
    }: ReactDatePickerCustomDayNameProps) => <span>{shortName}</span>;

    const { container } = render(
      <DatePicker
        renderCustomDayName={renderCustomDayName}
        weekDayClassName={weekDayClassName}
        inline
      />,
    );

    const weekendDays = container.querySelectorAll(
      ".react-datepicker__day-name.weekend",
    );
    // Should have 2 weekend days (Saturday and Sunday)
    expect(weekendDays.length).toBeGreaterThanOrEqual(2);
  });

  it("should pass locale to renderCustomDayName", () => {
    const renderCustomDayName = jest.fn(
      ({ shortName }: ReactDatePickerCustomDayNameProps) => (
        <span>{shortName}</span>
      ),
    );

    render(
      <DatePicker
        renderCustomDayName={renderCustomDayName}
        locale="en-US"
        inline
      />,
    );

    const firstCall = renderCustomDayName.mock.calls[0]?.[0];
    expect(firstCall?.locale).toBe("en-US");
  });

  it("should pass customDayNameCount when displaying multiple months", () => {
    const renderCustomDayName = jest.fn(
      ({ shortName }: ReactDatePickerCustomDayNameProps) => (
        <span>{shortName}</span>
      ),
    );

    render(
      <DatePicker
        renderCustomDayName={renderCustomDayName}
        monthsShown={3}
        inline
      />,
    );

    // Should be called 7 times per month, so 21 times for 3 months
    expect(renderCustomDayName).toHaveBeenCalledTimes(21);

    // Check that customDayNameCount is different for each month
    const firstMonthCall = renderCustomDayName.mock.calls[0]?.[0];
    const secondMonthCall = renderCustomDayName.mock.calls[7]?.[0];
    const thirdMonthCall = renderCustomDayName.mock.calls[14]?.[0];

    expect(firstMonthCall?.customDayNameCount).toBe(0);
    expect(secondMonthCall?.customDayNameCount).toBe(1);
    expect(thirdMonthCall?.customDayNameCount).toBe(2);
  });
});
