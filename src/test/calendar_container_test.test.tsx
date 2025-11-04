/**
 * Test suite for CalendarContainer component
 *
 * CalendarContainer is a wrapper component that provides accessibility features
 * for the datepicker calendar. It renders as a dialog with appropriate ARIA attributes.
 *
 * @see ../calendar_container.tsx
 */
import React from "react";
import { render } from "@testing-library/react";
import CalendarContainer from "../calendar_container";

describe("CalendarContainer", () => {
  /**
   * Test: Default rendering behavior
   * Verifies that the component renders with correct default ARIA attributes
   * and displays "Choose Date" as the default aria-label.
   */
  it("should render with default props", () => {
    const { container } = render(
      <CalendarContainer>
        <div>Test Content</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute("aria-label")).toBe("Choose Date");
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(dialog?.textContent).toBe("Test Content");
  });

  /**
   * Test: Time selection mode
   * When showTime is true, the aria-label should indicate both date and time selection.
   */
  it("should render with showTime prop", () => {
    const { container } = render(
      <CalendarContainer showTime>
        <div>Test Content</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute("aria-label")).toBe("Choose Date and Time");
  });

  /**
   * Test: Time-only selection mode
   * When showTimeSelectOnly is true, the aria-label should indicate only time selection.
   */
  it("should render with showTimeSelectOnly prop", () => {
    const { container } = render(
      <CalendarContainer showTimeSelectOnly>
        <div>Test Content</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute("aria-label")).toBe("Choose Time");
  });

  /**
   * Test: Custom styling
   * Verifies that custom CSS classes are properly applied to the dialog element.
   */
  it("should apply custom className", () => {
    const { container } = render(
      <CalendarContainer className="custom-class">
        <div>Test Content</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.className).toBe("custom-class");
  });

  /**
   * Test: Multiple children rendering
   * Ensures the component can properly render multiple child elements.
   */
  it("should render multiple children", () => {
    const { container } = render(
      <CalendarContainer>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.children.length).toBe(3);
  });

  /**
   * Test: HTML attribute passthrough
   * Verifies that additional HTML attributes are correctly passed to the dialog element.
   */
  it("should pass through additional HTML attributes", () => {
    const { container } = render(
      <CalendarContainer data-testid="test-container" id="calendar-id">
        <div>Test Content</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute("data-testid")).toBe("test-container");
    expect(dialog?.getAttribute("id")).toBe("calendar-id");
  });
});
