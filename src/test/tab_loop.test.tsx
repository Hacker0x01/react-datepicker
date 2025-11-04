import { render, fireEvent } from "@testing-library/react";
import React from "react";

import TabLoop from "../tab_loop";

describe("TabLoop", () => {
  it("renders children when enableTabLoop is true", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <div data-testid="child">Test Content</div>
      </TabLoop>,
    );

    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it("renders children when enableTabLoop is false", () => {
    const { container } = render(
      <TabLoop enableTabLoop={false}>
        <div data-testid="child">Test Content</div>
      </TabLoop>,
    );

    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it("renders tab loop wrapper when enableTabLoop is true", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <div>Content</div>
      </TabLoop>,
    );

    expect(container.querySelector(".react-datepicker__tab-loop")).toBeTruthy();
    expect(
      container.querySelector(".react-datepicker__tab-loop__start"),
    ).toBeTruthy();
    expect(
      container.querySelector(".react-datepicker__tab-loop__end"),
    ).toBeTruthy();
  });

  it("does not render tab loop wrapper when enableTabLoop is false", () => {
    const { container } = render(
      <TabLoop enableTabLoop={false}>
        <div>Content</div>
      </TabLoop>,
    );

    expect(container.querySelector(".react-datepicker__tab-loop")).toBe(null);
    expect(container.querySelector(".react-datepicker__tab-loop__start")).toBe(
      null,
    );
    expect(container.querySelector(".react-datepicker__tab-loop__end")).toBe(
      null,
    );
  });

  it("uses default enableTabLoop value when not provided", () => {
    const { container } = render(
      <TabLoop>
        <div>Content</div>
      </TabLoop>,
    );

    // Default is true
    expect(container.querySelector(".react-datepicker__tab-loop")).toBeTruthy();
  });

  it("focuses last tabbable element when start sentinel is focused", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <button data-testid="button-1">Button 1</button>
        <button data-testid="button-2">Button 2</button>
        <button data-testid="button-3">Button 3</button>
      </TabLoop>,
    );

    const startSentinel = container.querySelector(
      ".react-datepicker__tab-loop__start",
    ) as HTMLElement;
    const lastButton = container.querySelector(
      '[data-testid="button-3"]',
    ) as HTMLButtonElement;

    const focusSpy = jest.spyOn(lastButton, "focus");
    fireEvent.focus(startSentinel);

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it("focuses first tabbable element when end sentinel is focused", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <button data-testid="button-1">Button 1</button>
        <button data-testid="button-2">Button 2</button>
        <button data-testid="button-3">Button 3</button>
      </TabLoop>,
    );

    const endSentinel = container.querySelector(
      ".react-datepicker__tab-loop__end",
    ) as HTMLElement;
    const firstButton = container.querySelector(
      '[data-testid="button-1"]',
    ) as HTMLButtonElement;

    const focusSpy = jest.spyOn(firstButton, "focus");
    fireEvent.focus(endSentinel);

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it("handles multiple tabbable element types", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <button data-testid="button">Button</button>
        <input data-testid="input" type="text" />
        <select data-testid="select">
          <option>Option</option>
        </select>
        <textarea data-testid="textarea" />
        <a href="#" data-testid="link">
          Link
        </a>
      </TabLoop>,
    );

    const endSentinel = container.querySelector(
      ".react-datepicker__tab-loop__end",
    ) as HTMLElement;
    const firstButton = container.querySelector(
      '[data-testid="button"]',
    ) as HTMLButtonElement;

    const focusSpy = jest.spyOn(firstButton, "focus");
    fireEvent.focus(endSentinel);

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it("ignores disabled elements", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <button disabled data-testid="button-disabled">
          Disabled
        </button>
        <button data-testid="button-enabled">Enabled</button>
        <button data-testid="button-enabled-2">Enabled 2</button>
      </TabLoop>,
    );

    const endSentinel = container.querySelector(
      ".react-datepicker__tab-loop__end",
    ) as HTMLElement;
    const enabledButton = container.querySelector(
      '[data-testid="button-enabled"]',
    ) as HTMLButtonElement;

    const focusSpy = jest.spyOn(enabledButton, "focus");
    fireEvent.focus(endSentinel);

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it("ignores elements with tabIndex -1", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <button tabIndex={-1} data-testid="button-negative">
          Negative TabIndex
        </button>
        <button data-testid="button-normal">Normal</button>
        <button data-testid="button-normal-2">Normal 2</button>
      </TabLoop>,
    );

    const endSentinel = container.querySelector(
      ".react-datepicker__tab-loop__end",
    ) as HTMLElement;
    const normalButton = container.querySelector(
      '[data-testid="button-normal"]',
    ) as HTMLButtonElement;

    const focusSpy = jest.spyOn(normalButton, "focus");
    fireEvent.focus(endSentinel);

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it("handles case with only one tabbable element", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <button data-testid="single-button">Single Button</button>
      </TabLoop>,
    );

    const startSentinel = container.querySelector(
      ".react-datepicker__tab-loop__start",
    ) as HTMLElement;

    // Should not throw error with single element
    expect(() => fireEvent.focus(startSentinel)).not.toThrow();
  });

  it("handles case with no tabbable elements", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <div>No tabbable elements</div>
      </TabLoop>,
    );

    const startSentinel = container.querySelector(
      ".react-datepicker__tab-loop__start",
    ) as HTMLElement;

    // Should not throw error with no tabbable elements
    expect(() => fireEvent.focus(startSentinel)).not.toThrow();
  });

  it("renders with custom tabIndex elements", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <div tabIndex={0} data-testid="div-1">
          Div 1
        </div>
        <div tabIndex={0} data-testid="div-2">
          Div 2
        </div>
      </TabLoop>,
    );

    const endSentinel = container.querySelector(
      ".react-datepicker__tab-loop__end",
    ) as HTMLElement;
    const firstDiv = container.querySelector(
      '[data-testid="div-1"]',
    ) as HTMLDivElement;

    const focusSpy = jest.spyOn(firstDiv, "focus");
    fireEvent.focus(endSentinel);

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });
});
