/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import React from "react";

import Calendar from "../calendar";
import { newDate, formatDate } from "../date_utils";

const dateFormat = "MMMM yyyy";

describe("monthHeaderPosition", () => {
  it("should render month header in top position by default", () => {
    const { container } = render(
      <Calendar
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
        dropdownMode="scroll"
      />,
    );

    // Header should be in the default header section
    const header = container.querySelector(".react-datepicker__header");
    const currentMonth = header?.querySelector(
      ".react-datepicker__current-month",
    );
    expect(currentMonth).not.toBeNull();
    expect(currentMonth?.textContent).toContain(
      formatDate(newDate(), dateFormat),
    );
  });

  it("should render month header in middle position when monthHeaderPosition is 'middle'", () => {
    const { container } = render(
      <Calendar
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
        dropdownMode="scroll"
        monthHeaderPosition="middle"
      />,
    );

    // Header should be within the header-wrapper (not at top of calendar)
    const topHeaderOutsideMonths = container.querySelectorAll(
      ".react-datepicker__month-container > .react-datepicker__header",
    );
    expect(topHeaderOutsideMonths.length).toBe(0);

    // Should be within the month container (middle position)
    const monthContainer = container.querySelector(
      ".react-datepicker__month-container",
    );
    const headerInMonth = monthContainer?.querySelector(
      ".react-datepicker__header .react-datepicker__current-month",
    );
    expect(headerInMonth).not.toBeNull();
    expect(headerInMonth?.textContent).toContain(
      formatDate(newDate(), dateFormat),
    );

    // Should have wrapper with navigation buttons
    const headerWrapper = container.querySelector(
      ".react-datepicker__header-wrapper",
    );
    expect(headerWrapper).not.toBeNull();
  });

  it("should render month header in bottom position when monthHeaderPosition is 'bottom'", () => {
    const { container } = render(
      <Calendar
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
        dropdownMode="scroll"
        monthHeaderPosition="bottom"
      />,
    );

    // Header should be within the header-wrapper (not at top of calendar)
    const topHeaderOutsideMonths = container.querySelectorAll(
      ".react-datepicker__month-container > .react-datepicker__header",
    );
    expect(topHeaderOutsideMonths.length).toBe(0);

    // Should be within the month container (bottom position)
    const monthContainer = container.querySelector(
      ".react-datepicker__month-container",
    );
    const headerInMonth = monthContainer?.querySelector(
      ".react-datepicker__header .react-datepicker__current-month",
    );
    expect(headerInMonth).not.toBeNull();
    expect(headerInMonth?.textContent).toContain(
      formatDate(newDate(), dateFormat),
    );

    // Should have wrapper with navigation buttons
    const headerWrapper = container.querySelector(
      ".react-datepicker__header-wrapper",
    );
    expect(headerWrapper).not.toBeNull();
  });

  it("should render month header for each month when multiple months shown with middle position", () => {
    const { container } = render(
      <Calendar
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
        dropdownMode="scroll"
        monthHeaderPosition="middle"
        monthsShown={2}
      />,
    );

    // Should find headers within header-wrappers
    const headerWrappers = container.querySelectorAll(
      ".react-datepicker__header-wrapper",
    );
    expect(headerWrappers.length).toBe(2);

    const monthHeaders = container.querySelectorAll(
      ".react-datepicker__header-wrapper .react-datepicker__header .react-datepicker__current-month",
    );
    expect(monthHeaders.length).toBe(2);
  });

  it("should render month header for each month when multiple months shown with bottom position", () => {
    const { container } = render(
      <Calendar
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
        dropdownMode="scroll"
        monthHeaderPosition="bottom"
        monthsShown={2}
      />,
    );

    // Should find headers within header-wrappers
    const headerWrappers = container.querySelectorAll(
      ".react-datepicker__header-wrapper",
    );
    expect(headerWrappers.length).toBe(2);

    const monthHeaders = container.querySelectorAll(
      ".react-datepicker__header-wrapper .react-datepicker__header .react-datepicker__current-month",
    );
    expect(monthHeaders.length).toBe(2);
  });

  it("should use top position when monthHeaderPosition is 'top'", () => {
    const { container } = render(
      <Calendar
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
        dropdownMode="scroll"
        monthHeaderPosition="top"
      />,
    );

    // Header should be in the default header section
    const header = container.querySelector(".react-datepicker__header");
    const currentMonth = header?.querySelector(
      ".react-datepicker__current-month",
    );
    expect(currentMonth).not.toBeNull();
  });

  it("should render month header with middle position when navigation buttons might be hidden", () => {
    const minDate = newDate();
    const maxDate = newDate();

    const { container } = render(
      <Calendar
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
        dropdownMode="scroll"
        monthHeaderPosition="middle"
        minDate={minDate}
        maxDate={maxDate}
        showDisabledMonthNavigation={false}
      />,
    );

    // Should still render the wrapper with header
    const headerWrapper = container.querySelector(
      ".react-datepicker__header-wrapper",
    );
    expect(headerWrapper).not.toBeNull();

    const header = container.querySelector(".react-datepicker__header");
    expect(header).not.toBeNull();
  });

  it("should render month header with bottom position when renderCustomHeader is provided", () => {
    const { container } = render(
      <Calendar
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
        dropdownMode="scroll"
        monthHeaderPosition="bottom"
        renderCustomHeader={() => <div>Custom Header</div>}
      />,
    );

    // Should render custom header
    const customHeader = container.querySelector(
      ".react-datepicker__header--custom",
    );
    expect(customHeader).not.toBeNull();
  });
});
