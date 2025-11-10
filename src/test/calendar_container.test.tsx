import { render } from "@testing-library/react";
import React from "react";

import CalendarContainer from "../calendar_container";
import { CalendarContainer as CalendarContainerFromIndex } from "../index";

describe("CalendarContainer", () => {
  it("renders with default props", () => {
    const { container } = render(
      <CalendarContainer>
        <div>Test Content</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute("aria-label")).toBe("Choose Date");
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(dialog?.textContent).toBe("Test Content");
  });

  it("exposes CalendarContainer via the package entry point", () => {
    const { container } = render(
      <CalendarContainerFromIndex>
        <div>Entry Content</div>
      </CalendarContainerFromIndex>,
    );

    expect(container.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it("renders with showTimeSelectOnly prop", () => {
    const { container } = render(
      <CalendarContainer showTimeSelectOnly>
        <div>Time Content</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute("aria-label")).toBe("Choose Time");
  });

  it("renders with showTime prop", () => {
    const { container } = render(
      <CalendarContainer showTime>
        <div>Date and Time Content</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute("aria-label")).toBe("Choose Date and Time");
  });

  it("renders with both showTime and showTimeSelectOnly props", () => {
    const { container } = render(
      <CalendarContainer showTime showTimeSelectOnly>
        <div>Content</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    // showTimeSelectOnly takes precedence
    expect(dialog?.getAttribute("aria-label")).toBe("Choose Time");
  });

  it("applies custom className", () => {
    const { container } = render(
      <CalendarContainer className="custom-class">
        <div>Content</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.className).toBe("custom-class");
  });

  it("renders children correctly", () => {
    const { container } = render(
      <CalendarContainer>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </CalendarContainer>,
    );

    expect(container.querySelector('[data-testid="child-1"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="child-2"]')).toBeTruthy();
  });

  it("renders with proper ARIA attributes", () => {
    const { container } = render(
      <CalendarContainer>
        <div>Content</div>
      </CalendarContainer>,
    );

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute("role")).toBe("dialog");
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(dialog?.getAttribute("aria-label")).toBe("Choose Date");
  });
});
